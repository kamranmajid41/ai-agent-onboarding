const express = require('express');
const { protect } = require('../middleware/auth');
const ConversationLog = require('../models/ConversationLog');
const UploadedAsset = require('../models/UploadedAsset');
const { generateAgentResponse } = require('../services/openaiService');
const User = require('../models/User'); // Assuming you need user info for agent config

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
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const agentConfig = user.onboardingData?.step3 || {};
    const businessInfo = user.onboardingData?.step1 || {};
    const knowledgeBaseConfig = user.onboardingData?.step2 || {};

    let context = '';

    // Add business information to context
    if (businessInfo.businessName) context += `Business Name: ${businessInfo.businessName}. `;
    if (businessInfo.industry) context += `Industry: ${businessInfo.industry}. `;
    if (businessInfo.website) context += `Website: ${businessInfo.website}. `;
    if (businessInfo.email) context += `Contact Email: ${businessInfo.email}. `;

    // Add knowledge base content to context
    if (knowledgeBaseConfig.files && knowledgeBaseConfig.files.length > 0) {
      const uploadedAssets = await UploadedAsset.find({ user: userId, fileUrl: { $in: knowledgeBaseConfig.files } });
      uploadedAssets.forEach(asset => {
        if (asset.extractedText) {
          context += `\nDocument Content (from ${asset.originalName}):\n${asset.extractedText.substring(0, 1000)}...\n`; // Limit text to avoid exceeding token limits
        }
      });
    }

    if (knowledgeBaseConfig.crawl && knowledgeBaseConfig.website) {
      // For crawled content, we'd ideally fetch the *stored* crawled data, not re-crawl
      // Assuming `extractedText` for crawled content is stored in UploadedAsset or similar.
      // For now, if not explicitly stored as an asset, it would need to be re-fetched or retrieved from a dedicated crawl store.
      // Given the current schema, if crawled text is needed directly in the prompt, it needs to be stored more permanently.
      // For this example, if the crawled website URL itself is the knowledge, we can mention it:
      context += `\nCrawl Source: ${knowledgeBaseConfig.website}. `;
    }
    if (knowledgeBaseConfig.docLinks && knowledgeBaseConfig.docLinks.length > 0) {
      knowledgeBaseConfig.docLinks.forEach(link => {
        // Similar to crawled content, if the *content* from these links needs to be in prompt,
        // it should be stored in UploadedAsset or a similar model after fetching.
        context += `\nDocument Link: ${link}. `;
      });
    }

    const agentPersona = agentConfig.personality === 'Custom' && agentConfig.customPersonality
      ? agentConfig.customPersonality
      : agentConfig.personality || 'You are a helpful AI assistant.';
    
    const objectivesText = agentConfig.objectives && agentConfig.objectives.length > 0
      ? `Your objectives are: ${agentConfig.objectives.join(', ')}.`
      : '';

    const systemMessage = `You are an AI assistant for a business named ${businessInfo.businessName || '[Your Business Name]'} in the ${businessInfo.industry || 'general'} industry. Your primary goal is to provide accurate, relevant, and helpful information to users based *solely* on the context provided about the business. ${objectivesText} Your persona is: ${agentPersona}. Always prioritize the following business information and documents when generating responses:\n\n${context}\n\n`;

    const prompt = `${systemMessage}User: ${message}\nResponse:`;

    const agentResponse = await generateAgentResponse(prompt);

    const newConversation = new ConversationLog({
      user: userId,
      agent: agentConfig.agentName || user.settings?.agentName || 'Default Agent',
      messages: [{
        sender: 'user',
        text: message
      }, {
        sender: 'agent',
        text: agentResponse
      }, ],
    });
    await newConversation.save();

    res.json({ response: agentResponse });
  } catch (err) {
    console.error("Error in /api/agents/chat:", err);
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