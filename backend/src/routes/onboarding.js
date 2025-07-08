const express = require('express');
const {
  saveOnboardingStep,
  getOnboardingData,
  completeOnboarding,
  updateSettings,
  getSettings
} = require('../controllers/onboardingController');
const User = require('../models/User');
const openaiService = require('../services/openaiService');
const goHighLevelService = require('../services/goHighLevelService');

const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Onboarding data routes
router.post('/step/:stepNumber', saveOnboardingStep);
router.get('/', getOnboardingData);
router.post('/complete', completeOnboarding);
router.post('/agent-config', protect, async (req, res) => {
  try {
    const { config } = req.body;
    if (!config) return res.status(400).json({ success: false, message: 'No config provided' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.onboardingData.step3 = config;
    await user.save();
    res.status(200).json({ success: true, message: 'Agent config saved', data: user.onboardingData.step3 });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save agent config', error: err.message });
  }
});

// Settings routes
router.put('/settings', updateSettings);
router.get('/settings', getSettings);

router.post('/integrate', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    // Summarize/Process content with OpenAI
    const summary = await openaiService.summarizeText(user.onboardingData.step2?.files?.join(' ') || '');
    // Push config to GoHighLevel
    const ghlRes = await goHighLevelService.pushAgentConfig(user, user.onboardingData.step3);
    res.status(200).json({ success: true, summary, ghl: ghlRes });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Integration failed', error: err.message });
  }
});

module.exports = router; 