const User = require('../models/User');
const ConversationLog = require('../models/ConversationLog');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Do not send passwords
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single user by ID
// @route   GET /api/admin/users/:id
// @access  Private (Admin)
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Admin get user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update user (e.g., role, isActive status)
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
exports.updateUser = async (req, res) => {
  try {
    const { role, isActive, company, settings, integrations } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent admin from changing their own role to non-admin or deactivating themselves
    if (req.user.id === req.params.id && (role === 'user' || isActive === false)) {
      return res.status(403).json({ success: false, message: 'Admin cannot alter their own primary status or role.' });
    }

    if (role) user.role = role;
    if (typeof isActive === 'boolean') user.isActive = isActive;
    if (company) user.company = { ...user.company, ...company };
    if (settings) user.settings = { ...user.settings, ...settings };
    if (integrations) user.integrations = { ...user.integrations, ...integrations };

    await user.save();

    res.status(200).json({ success: true, message: 'User updated successfully', data: user });
  } catch (error) {
    console.error('Admin update user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
  try {
    // Prevent admin from deleting themselves
    if (req.user.id === req.params.id) {
      return res.status(403).json({ success: false, message: 'Admin cannot delete their own account.' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // Optionally, delete associated data like conversation logs, assets, etc.
    await ConversationLog.deleteMany({ user: req.params.id });
    // await UploadedAsset.deleteMany({ user: req.params.id }); // If you want to cascade delete

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Admin delete user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get overall platform metrics
// @route   GET /api/admin/metrics/overview
// @access  Private (Admin)
exports.getPlatformMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalConversations = await ConversationLog.countDocuments();
    const totalAgents = await User.countDocuments({ 'onboardingData.step5.status.agent': 'Live' }); // Assuming step5.status.agent indicates a live agent

    // You can add more complex metrics here, e.g., daily active users, new users over time, etc.

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        totalConversations,
        totalAgents,
      },
    });
  } catch (error) {
    console.error('Admin get platform metrics error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; 