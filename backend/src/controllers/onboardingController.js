const User = require('../models/User');

// @desc    Save onboarding step data
// @route   POST /api/onboarding/step/:stepNumber
// @access  Private
exports.saveOnboardingStep = async (req, res) => {
  try {
    const { stepNumber } = req.params;
    const stepData = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update the specific step data
    user.onboardingData[`step${stepNumber}`] = stepData;
    await user.save();

    res.status(200).json({
      success: true,
      message: `Step ${stepNumber} data saved successfully`,
      data: user.onboardingData[`step${stepNumber}`]
    });
  } catch (error) {
    console.error('Save onboarding step error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving onboarding data'
    });
  }
};

// @desc    Get onboarding data
// @route   GET /api/onboarding
// @access  Private
exports.getOnboardingData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user.onboardingData
    });
  } catch (error) {
    console.error('Get onboarding data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving onboarding data'
    });
  }
};

// @desc    Complete onboarding
// @route   POST /api/onboarding/complete
// @access  Private
exports.completeOnboarding = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate agent URLs and phone number
    const agentName = user.onboardingData.step1?.businessName || user.company.name;
    const chatUrl = `https://chat.${user.company.name.toLowerCase().replace(/\s+/g, '')}.com`;
    const dashboardUrl = `https://dashboard.${user.company.name.toLowerCase().replace(/\s+/g, '')}.com`;
    const phoneNumber = `+1-555-${Math.random().toString().slice(2, 6)}-${Math.random().toString().slice(2, 6)}`;

    // Update step 5 with deployment data
    user.onboardingData.step5 = {
      agentName: `${agentName} AI Assistant`,
      chatUrl,
      phoneNumber,
      dashboardUrl,
      status: {
        agent: 'Live',
        training: 'Complete',
        integration: 'Connected'
      }
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Onboarding completed successfully',
      data: {
        agentName: user.onboardingData.step5.agentName,
        chatUrl: user.onboardingData.step5.chatUrl,
        phoneNumber: user.onboardingData.step5.phoneNumber,
        dashboardUrl: user.onboardingData.step5.dashboardUrl,
        status: user.onboardingData.step5.status
      }
    });
  } catch (error) {
    console.error('Complete onboarding error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing onboarding'
    });
  }
};

// @desc    Update settings
// @route   PUT /api/onboarding/settings
// @access  Private
exports.updateSettings = async (req, res) => {
  try {
    const { settings } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update settings
    user.settings = { ...user.settings, ...settings };
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: user.settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating settings'
    });
  }
};

// @desc    Get settings
// @route   GET /api/onboarding/settings
// @access  Private
exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user.settings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving settings'
    });
  }
}; 