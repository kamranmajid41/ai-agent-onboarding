const express = require('express');
const { protect } = require('../middleware/auth');
const ConversationLog = require('../models/ConversationLog');
const { generateAgentResponse } = require('../services/openaiService');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/agents/chat
// @desc    Send a message to the AI agent and get a response
// @access  Private
router.post('/chat', protect, async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  if (!message) {
    return res.status(400).json({ msg: 'Message is required' });
  }

  try {
    // Fetch user-specific agent configuration or general config
    const user = await User.findById(userId);
    let agentConfig = {};
    if (user && user.agentConfig) {
      agentConfig = user.agentConfig; // Assuming agentConfig is stored on the User model
    }

    // Construct the prompt for the AI agent
    const prompt = `User: ${message}\nAgent Persona: ${agentConfig.persona || 'You are a helpful AI assistant.'}\nContext: ${agentConfig.context || ''}\nResponse:`;

    // Use OpenAI to generate agent response
    const agentResponse = await generateAgentResponse(prompt);

    // Save conversation log
    const newConversation = new ConversationLog({
      user: userId,
      agent: agentConfig.agentName || 'Default Agent',
      messages: [{
        role: 'user',
        content: message
      }, {
        role: 'agent',
        content: agentResponse
      }, ],
    });
    await newConversation.save();

    res.json({ response: agentResponse });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
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