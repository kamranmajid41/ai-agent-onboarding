const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updatePassword,
  setupAdmin,
  forgotPassword,
  resetPassword,
  updateGoHighLevelIntegration
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);

// Temporary route to setup admin (REMOVE AFTER USE!)
router.post('/setup-admin', setupAdmin);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);
router.put('/gohighlevel-integration', protect, updateGoHighLevelIntegration);

module.exports = router; 