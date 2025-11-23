// import db from './config/db.js';
// import express from "express";
// import cors from "cors";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

//Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wwms'
})

// Test DB connection
db.connect((err) => {
  if (err) console.log("DB connection failed:", err);
  else console.log("Database connected successfully!");
});

app.listen(8081, ()=>{
    console.log("Listening....");
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
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login Successful", token });
  });
});



//Signup backend
app.post('/signup', (req, res) => {
  const { fname, lname, phonenumber, email, password } = req.body;

  if (!fname || !lname || !phonenumber || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const insertSql = "INSERT INTO user_details(`fname`,`lname`,`phonenumber`,`email`,`password`) VALUES (?)";

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) return res.status(500).json({ message: 'Error securing password' });

    const values = [
      fname,
      lname,
      phonenumber,
      email,
      hashedPassword
    ];

    db.query(insertSql, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: 'Signup successful' });
    });
  });
});


//Get all available jobs
app.get("/available_jobs", (req, res) => {
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

// API Route to insert job
app.post("/customerjobpost", (req, res) => {
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


// GET categories API
app.get("/job_category", (req, res) => {
  db.query("SELECT category FROM job_category", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
  });
});


// Routes
//app.use("/customerjobs", customerJobRoutes);