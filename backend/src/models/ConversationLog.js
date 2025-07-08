const mongoose = require('mongoose');

const conversationLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agentConfig: { type: Object },
  messages: [
    {
      sender: { type: String, enum: ['user', 'agent'], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ConversationLog', conversationLogSchema); 