const express = require('express');
const { protect } = require('../middleware/auth');
const ConversationLog = require('../models/ConversationLog');
const openaiService = require('../services/openaiService');
const User = require('../models/User');

const router = express.Router();

// Agent chat preview endpoint
router.post('/chat', protect, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'No message provided' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    // Use OpenAI to generate agent response (stub for now)
    const agentReply = await openaiService.summarizeText(message); // Replace with real chat logic
    // Log conversation
    const log = await ConversationLog.create({
      user: req.user.id,
      agentConfig: user.onboardingData.step3,
      messages: [
        { sender: 'user', text: message },
        { sender: 'agent', text: agentReply }
      ]
    });
    res.status(200).json({ success: true, reply: agentReply, log });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Agent chat failed', error: err.message });
  }
});

router.get('/conversations', protect, async (req, res) => {
  try {
    const logs = await ConversationLog.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch conversations', error: err.message });
  }
});

router.get('/conversations/:id', protect, async (req, res) => {
  try {
    const log = await ConversationLog.findOne({ _id: req.params.id, user: req.user.id });
    if (!log) return res.status(404).json({ success: false, message: 'Conversation not found' });
    res.status(200).json({ success: true, log });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch conversation', error: err.message });
  }
});

module.exports = router; 