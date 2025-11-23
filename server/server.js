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
const morgan = require('morgan');
const authenticateToken = require('./middleware/auth');

const app = express();

// Logger configuration
morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('timestamp', () => new Date().toISOString());

// Allow multiple origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(null, true); // For development, allow all origins
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// HTTP request logging
app.use(morgan(':timestamp :method :url :status :res[content-length] - :response-time ms'));

// Request body logging for debugging (excluding sensitive routes)
app.use((req, res, next) => {
  if (req.path !== '/signin' && req.path !== '/signup') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`,
      Object.keys(req.body).length > 0 ? `Body: ${JSON.stringify(req.body)}` : '');
  } else {
    // Log without password for sensitive routes
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) sanitizedBody.password = '***HIDDEN***';
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} Body:`, sanitizedBody);
  }
  next();
});

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

  console.log(`[${new Date().toISOString()}] Login attempt for email:`, email);

  if (!email || !password) {
    console.log(`[${new Date().toISOString()}] Login validation failed - missing credentials`);
    return res.status(400).json({ message: "Email & Password required" });
  }

  db.query("SELECT * FROM user_details WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] Login DB error:`, err);
      return res.status(500).json({ message: "Server error", details: err.message });
    }

    if (result.length === 0) {
      console.log(`[${new Date().toISOString()}] User not found:`, email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];
    console.log(`[${new Date().toISOString()}] User found - ID:`, user.id, 'Email:', user.email);
    console.log(`[${new Date().toISOString()}] Stored password hash length:`, user.password?.length);
    console.log(`[${new Date().toISOString()}] Stored password hash starts with:`, user.password?.substring(0, 7));

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(`[${new Date().toISOString()}] Password match result:`, isMatch);

      if (!isMatch) {
        console.log(`[${new Date().toISOString()}] Password mismatch for user:`, email);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log(`[${new Date().toISOString()}] Login successful for:`, email);

      const token = jwt.sign(
        { id: user.id, email: user.email, fname: user.fname, lname: user.lname },
        process.env.JWT_SECRET || "SECRET_KEY",
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
      );

      res.json({ message: "Login Successful", token });
    } catch (compareError) {
      console.error(`[${new Date().toISOString()}] Password compare error:`, compareError);
      console.error('Stack:', compareError.stack);
      return res.status(500).json({ message: "Authentication error", details: compareError.message });
    }
  });
});



//Signup backend
app.post('/signup', async (req, res) => {
  const { fname, lname, phonenumber, email, password, address, usertype } = req.body;

  console.log(`[${new Date().toISOString()}] Signup attempt for email:`, email);

  if (!fname || !lname || !phonenumber || !email || !password) {
    console.log(`[${new Date().toISOString()}] Signup validation failed - missing fields`);
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const checkSql = "SELECT * FROM user_details WHERE email = ?";
    console.log(`[${new Date().toISOString()}] Checking if user exists:`, email);

    db.query(checkSql, [email], async (checkErr, checkResult) => {
      if (checkErr) {
        console.error(`[${new Date().toISOString()}] ERROR checking user existence:`, checkErr);
        return res.status(500).json({ message: 'Database error', details: checkErr.message });
      }

      if (checkResult.length > 0) {
        console.log(`[${new Date().toISOString()}] User already exists:`, email);
        return res.status(400).json({ message: 'User already exists' });
      }

      console.log(`[${new Date().toISOString()}] Hashing password for new user:`, email);
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = "INSERT INTO user_details(`fname`,`lname`,`phonenumber`,`email`,`password`,`address`,`usertype`) VALUES (?)";
      const values = [
        fname,
        lname,
        phonenumber,
        email,
        hashedPassword,
        address || '',
        usertype || 'customer' // Default to 'customer' if not provided
      ];

      db.query(insertSql, [values], (err, data) => {
        if (err) {
          console.error(`[${new Date().toISOString()}] ERROR creating user:`, err);
          console.error('SQL Query:', insertSql);
          console.error('Values (password hidden):', [fname, lname, phonenumber, email, '***', address || '', usertype || 'customer']);
          return res.status(500).json({ message: 'Error creating user', details: err.message });
        }
        console.log(`[${new Date().toISOString()}] User created successfully:`, email, 'ID:', data.insertId, 'Type:', usertype || 'customer');
        return res.json({ message: 'Signup successful', userId: data.insertId });
      });
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ERROR in signup process:`, error);
    console.error('Stack:', error.stack);
    return res.status(500).json({ message: 'Error securing password', details: error.message });
  }
});


//Get current user profile (Protected route)
app.get("/api/user/profile", authenticateToken, (req, res) => {
  const userId = req.user.id;
  console.log(`[${new Date().toISOString()}] Fetching profile for user ID:`, userId);

  const sql = "SELECT id, fname, lname, email, phonenumber FROM user_details WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] ERROR fetching user profile:`, err);
      console.error('SQL Query:', sql, 'Params:', [userId]);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    if (result.length === 0) {
      console.log(`[${new Date().toISOString()}] User not found with ID:`, userId);
      return res.status(404).json({ error: "User not found" });
    }
    console.log(`[${new Date().toISOString()}] Successfully fetched profile for:`, result[0].email);
    res.json(result[0]);
  });
});

//Get all available jobs (Protected route)
app.get("/available_jobs", authenticateToken, (req, res) => {
  console.log(`[${new Date().toISOString()}] Fetching all available jobs for user:`, req.user.email);
  const sql = "SELECT * FROM available_jobs";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] ERROR fetching available_jobs:`, err);
      console.error('SQL Query:', sql);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    console.log(`[${new Date().toISOString()}] Successfully fetched ${data.length} jobs`);
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

  console.log(`[${new Date().toISOString()}] Creating new job post by user:`, req.user.email);
  console.log('Job details:', { job_title, job_location, customer_name });

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

    const values = [
      job_title,
      job_location,
      job_description,
      skills,
      jobPostedDateFormatted,
      customer_name,
      customer_phone,
      customer_address
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(`[${new Date().toISOString()}] MYSQL ERROR inserting job:`, err);
        console.error('SQL Query:', sql);
        console.error('Values:', values);
        return res.status(500).json({
          message: "DB Error",
          error: err.message || err.sqlMessage
        });
      }

      console.log(`[${new Date().toISOString()}] Job posted successfully! Insert ID:`, result.insertId);
      res.json({ message: "Job posted successfully!", jobId: result.insertId });
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] SERVER ERROR in job post:`, error);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


// GET categories API (Protected route)
app.get("/job_category", authenticateToken, (req, res) => {
  console.log(`[${new Date().toISOString()}] Fetching job categories for user:`, req.user.email);
  db.query("SELECT category FROM job_category", (err, results) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] ERROR fetching job categories:`, err);
      return res.status(500).json({ error: "DB error", details: err.message });
    }
    console.log(`[${new Date().toISOString()}] Successfully fetched ${results.length} categories`);
    res.json(results);
  });
});


// DEVELOPMENT ONLY - Password test endpoint
app.post("/dev/test-password", async (req, res) => {
  const { email, testPassword } = req.body;

  console.log(`[${new Date().toISOString()}] DEV: Testing password for:`, email);

  if (!email || !testPassword) {
    return res.status(400).json({ message: 'Email and testPassword required' });
  }

  db.query("SELECT * FROM user_details WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] DEV: DB error:`, err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      console.log(`[${new Date().toISOString()}] DEV: User not found:`, email);
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];
    console.log(`[${new Date().toISOString()}] DEV: User data:`, {
      id: user.id,
      email: user.email,
      passwordHash: user.password,
      passwordLength: user.password?.length
    });

    try {
      // Test the comparison
      const isMatch = await bcrypt.compare(testPassword, user.password);

      // Also create a fresh hash to compare
      const freshHash = await bcrypt.hash(testPassword, 10);
      const freshMatch = await bcrypt.compare(testPassword, freshHash);

      console.log(`[${new Date().toISOString()}] DEV: Test results:`, {
        testPassword,
        storedHash: user.password,
        matchResult: isMatch,
        freshHash,
        freshHashMatch: freshMatch
      });

      res.json({
        message: 'Password test complete',
        results: {
          email: user.email,
          passwordMatches: isMatch,
          storedHashValid: user.password?.startsWith('$2b$'),
          freshHashTest: freshMatch,
          recommendation: !isMatch ? 'Password does not match. Use /dev/reset-password to set new password' : 'Password matches!'
        }
      });
    } catch (error) {
      console.error(`[${new Date().toISOString()}] DEV: Error testing password:`, error);
      res.status(500).json({ message: 'Error testing password', details: error.message });
    }
  });
});

// DEVELOPMENT ONLY - Password reset utility endpoint
app.post("/dev/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  console.log(`[${new Date().toISOString()}] DEV: Password reset request for:`, email);

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and newPassword required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(`[${new Date().toISOString()}] DEV: New password hash:`, hashedPassword);

    const sql = "UPDATE user_details SET password = ? WHERE email = ?";
    db.query(sql, [hashedPassword, email], (err, result) => {
      if (err) {
        console.error(`[${new Date().toISOString()}] DEV: Error updating password:`, err);
        return res.status(500).json({ message: 'Database error', details: err.message });
      }

      if (result.affectedRows === 0) {
        console.log(`[${new Date().toISOString()}] DEV: User not found:`, email);
        return res.status(404).json({ message: 'User not found' });
      }

      console.log(`[${new Date().toISOString()}] DEV: Password updated successfully for:`, email);
      res.json({
        message: 'Password reset successful',
        affectedRows: result.affectedRows
      });
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] DEV: Error in password reset:`, error);
    res.status(500).json({ message: 'Error hashing password', details: error.message });
  }
});

// Routes
//app.use("/customerjobs", customerJobRoutes);

// 404 handler - must be after all routes
app.use((req, res) => {
  console.log(`[${new Date().toISOString()}] 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    error: 'Route not found',
    path: req.url,
    method: req.method
  });
});

// Global error handler - must be last
app.use((err, req, res, next) => {
  console.error('=== GLOBAL ERROR HANDLER ===');
  console.error('Timestamp:', new Date().toISOString());
  console.error('Request:', req.method, req.url);
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  console.error('========================');

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});