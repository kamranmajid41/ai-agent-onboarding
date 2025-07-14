const express = require('express');
const { protect } = require('../middleware/auth');
const ConversationLog = require('../models/ConversationLog');

const router = express.Router();

// Dashboard metrics endpoint
router.get('/metrics', protect, async (req, res) => {
  try {
    const totalConversations = await ConversationLog.countDocuments({ user: req.user.id });
    const logs = await ConversationLog.find({ user: req.user.id });
    let totalMessages = 0;
    let totalCharacterLength = 0;

    logs.forEach(log => {
      totalMessages += log.messages.length;
      log.messages.forEach(msg => {
        totalCharacterLength += msg.text.length;
      });
    });

    const averageMessageLength = totalMessages > 0 ? (totalCharacterLength / totalMessages).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      metrics: {
        totalConversations,
        totalMessages,
        averageMessageLength,
        // Placeholders for future implementation
        avgResponseTime: 'N/A',
        satisfactionRate: 'N/A'
      }
    });
  } catch (err) {
    console.error("Error fetching dashboard metrics:", err);
    res.status(500).json({ success: false, message: 'Failed to fetch metrics', error: err.message });
  }
});

// Placeholder route for /api/dashboard
router.get('/', (req, res) => {
  res.json({ message: 'Dashboard route placeholder' });
});

module.exports = router; 