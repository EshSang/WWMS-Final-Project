const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const jobRoutes = require('./job.routes');
const categoryRoutes = require('./category.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/categories', categoryRoutes);

// Health check
router.get('/healthcheck', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
