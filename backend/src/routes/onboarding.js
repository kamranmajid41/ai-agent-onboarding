const express = require('express');
const User = require('../models/User');
const openaiService = require('../services/openaiService');
const goHighLevelService = require('../services/goHighLevelService');
const UploadedAsset = require('../models/UploadedAsset'); // Added this import for UploadedAsset
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Route to trigger integrations (e.g., after onboarding is complete or settings are updated)
router.post('/integrate', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Summarize/Process content with OpenAI (if relevant data exists)
    let summary = '';
    if (user.onboardingData?.step2?.files?.length > 0) {
      // Assuming files contain URLs, you might need to fetch extractedText from UploadedAsset here
      const uploadedAssets = await UploadedAsset.find({ user: req.user.id, fileUrl: { $in: user.onboardingData.step2.files } });
      const combinedText = uploadedAssets.map(asset => asset.extractedText).join(' ');
      if (combinedText.length > 0) {
        summary = await openaiService.summarizeText(combinedText);
      }
    }

    // Push config to GoHighLevel
    const ghlRes = await goHighLevelService.pushAgentConfig(user, user.onboardingData.step3);

    res.status(200).json({ success: true, summary, ghl: ghlRes, message: 'Integrations triggered successfully.' });
  } catch (err) {
    console.error("Integration failed:", err);
    res.status(500).json({ success: false, message: 'Integration failed', error: err.message });
  }
});

module.exports = router; 