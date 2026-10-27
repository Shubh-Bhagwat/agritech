const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getAllUsers,
  verifyUser,
  getSystemAnalytics,
  getReports,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.post('/login', adminLogin);

// Admin-only routes
router.get('/users', protect, adminOnly, getAllUsers);
router.put('/verify/:userId', protect, adminOnly, verifyUser);
router.get('/analytics', protect, adminOnly, getSystemAnalytics);
router.get('/reports', protect, adminOnly, getReports);

module.exports = router;
