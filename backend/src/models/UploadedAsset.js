const mongoose = require('mongoose');

const uploadedAssetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String }, // Made optional
  originalName: { type: String, required: true },
  fileType: { type: String }, // Made optional as not always applicable
  fileSize: { type: Number }, // Made optional
  extractedText: { type: String },
  source: { type: String, enum: ['file_upload', 'web_crawl', 'doc_link'], required: true }, // New field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UploadedAsset', uploadedAssetSchema); 