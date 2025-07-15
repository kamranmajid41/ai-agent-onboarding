const asyncHandler = require('../middleware/asyncHandler');
const goHighLevelService = require('../services/goHighLevelService');
const User = require('../models/User');

// @desc    Verify GoHighLevel API Key and connect
// @route   POST /api/gohighlevel/connect
// @access  Private
exports.connectGoHighLevel = asyncHandler(async (req, res, next) => {
  const { apiKey, locationId } = req.body;

  if (!apiKey) {
    return res.status(400).json({ success: false, message: 'GoHighLevel API Key is required' });
  }

  // Optional: Verify API Key with GoHighLevel API
  const isValidApiKey = await goHighLevelService.verifyApiKey(apiKey);
  if (!isValidApiKey) {
    return res.status(400).json({ success: false, message: 'Invalid GoHighLevel API Key' });
  }

  // Save integration details to user settings
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.integrations.goHighLevel.connected = true;
  user.integrations.goHighLevel.apiKey = apiKey;
  user.integrations.goHighLevel.locationId = locationId || ''; // Save locationId if provided

  await user.save();

  res.status(200).json({
    success: true,
    message: 'GoHighLevel integrated successfully',
    integration: user.integrations.goHighLevel
  });
});

// @desc    Disconnect GoHighLevel
// @route   POST /api/gohighlevel/disconnect
// @access  Private
exports.disconnectGoHighLevel = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.integrations.goHighLevel.connected = false;
  user.integrations.goHighLevel.apiKey = undefined; // Clear API Key
  user.integrations.goHighLevel.locationId = undefined; // Clear Location ID

  await user.save();

  res.status(200).json({
    success: true,
    message: 'GoHighLevel disconnected successfully',
    integration: user.integrations.goHighLevel
  });
});

// @desc    Get GoHighLevel Locations
// @route   GET /api/gohighlevel/locations
// @access  Private
exports.getGoHighLevelLocations = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const apiKey = user.integrations.goHighLevel.apiKey;

  if (!apiKey) {
    return res.status(400).json({ success: false, message: 'GoHighLevel API Key not found for user' });
  }

  const locations = await goHighLevelService.getLocations(apiKey);
  res.status(200).json({ success: true, locations });
});
