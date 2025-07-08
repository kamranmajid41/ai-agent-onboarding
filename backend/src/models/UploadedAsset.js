const mongoose = require('mongoose');

const uploadedAssetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, required: true },
  originalName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  extractedText: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UploadedAsset', uploadedAssetSchema); 