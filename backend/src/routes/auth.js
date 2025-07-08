const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updatePassword
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);

module.exports = router; 