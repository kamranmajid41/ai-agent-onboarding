const express = require('express');
const { protect } = require('../middleware/auth');
const {
  connectGoHighLevel,
  disconnectGoHighLevel,
  getGoHighLevelLocations
} = require('../controllers/goHighLevelController');

const router = express.Router();

router.route('/connect').post(protect, connectGoHighLevel);
router.route('/disconnect').post(protect, disconnectGoHighLevel);
router.route('/locations').get(protect, getGoHighLevelLocations);

module.exports = router;
