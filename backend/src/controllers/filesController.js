const UploadedAsset = require('../models/UploadedAsset');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
// const fs = require('fs'); // Removed fs import as it's no longer used

exports.extractTextFromFile = async (buffer, mimetype) => {
  if (mimetype === 'application/pdf') {
    const data = await pdf(buffer); // Use buffer directly
    return data.text;
  } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const { value } = await mammoth.extractRawText({ buffer: buffer }); // Use buffer directly
    return value;
  } else if (mimetype === 'text/plain') {
    return buffer.toString('utf8'); // Convert buffer to string
  } else {
    return 'Unsupported file type';
  }
}; 