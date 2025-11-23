// import db from './config/db.js';
// import express from "express";
// import cors from "cors";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

//Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'wwms'
})

// Test DB connection
db.connect((err) => {
  if (err) console.log("DB connection failed:", err);
  else console.log("Database connected successfully!");
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}...`);
});

//health check endpoint
app.get('/healthcheck', (req, res) => {
    res.send('Server is running');
});

//LOGIN API
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email & Password required" });

  db.query("SELECT * FROM user_details WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error("Login DB error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      console.log("User not found:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];
    console.log("Login attempt for:", email);

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, fname: user.fname, lname: user.lname },
        process.env.JWT_SECRET || "SECRET_KEY",
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
      );

      res.json({ message: "Login Successful", token });
    } catch (compareError) {
      console.error("Password compare error:", compareError);
      return res.status(500).json({ message: "Authentication error" });
    }
  });
});



//Signup backend
app.post('/signup', async (req, res) => {
  const { fname, lname, phonenumber, email, password } = req.body;

  if (!fname || !lname || !phonenumber || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const checkSql = "SELECT * FROM user_details WHERE email = ?";
    db.query(checkSql, [email], async (checkErr, checkResult) => {
      if (checkErr) return res.status(500).json({ message: 'Database error' });

      if (checkResult.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = "INSERT INTO user_details(`fname`,`lname`,`phonenumber`,`email`,`password`) VALUES (?)";
      const values = [
        fname,
        lname,
        phonenumber,
        email,
        hashedPassword
      ];

      db.query(insertSql, [values], (err, data) => {
        if (err) {
          console.error('Signup error:', err);
          return res.status(500).json({ message: 'Error creating user' });
        }
        return res.json({ message: 'Signup successful' });
      });
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Error securing password' });
  }
});


//Get current user profile (Protected route)
app.get("/api/user/profile", authenticateToken, (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT id, fname, lname, email, phonenumber FROM user_details WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result[0]);
  });
});

//Get all available jobs (Protected route)
app.get("/available_jobs", authenticateToken, (req, res) => {
  const sql = "SELECT * FROM available_jobs";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    // console.log("Fetched jobs:", data);
    res.json(data);
  });
});

// API Route to insert job (Protected route)
app.post("/customerjobpost", authenticateToken, (req, res) => {
  const {
    job_title,
    job_location,
    job_description,
    skills,
    job_posted_date,
    customer_name,
    customer_phone,
    customer_address
  } = req.body;

  try {
    // ✅ Correct variable usage
    const jobPostedDateFormatted = new Date(job_posted_date)
      .toISOString()
      .split("T")[0];

    const sql = `
      INSERT INTO available_jobs 
      (job_title, job_location, job_description, skills, job_posted_date, customer_name, customer_phone, customer_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        job_title,
        job_location,
        job_description,
        skills,
        jobPostedDateFormatted, // ✅ use formatted date
        customer_name,
        customer_phone,
        customer_address
      ],
      (err, result) => {
        if (err) {
          console.error("MYSQL ERROR: ", err);
          return res.status(500).json({
            message: "DB Error",
            error: err.sqlMessage
          });
        }

        res.json({ message: "Job posted successfully!" });
      }
    );
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


// GET categories API (Protected route)
app.get("/job_category", authenticateToken, (req, res) => {
  db.query("SELECT category FROM job_category", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
  });
});


// Routes
//app.use("/customerjobs", customerJobRoutes);