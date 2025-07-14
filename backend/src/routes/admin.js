const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getPlatformMetrics,
} = require('../controllers/adminController');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// User management routes
router.route('/users').get(getUsers);
router.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser);

// Platform metrics route
router.route('/metrics/overview').get(getPlatformMetrics);

module.exports = router; 