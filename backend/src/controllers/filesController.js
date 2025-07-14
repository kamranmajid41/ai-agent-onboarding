const UploadedAsset = require('../models/UploadedAsset');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');

exports.extractTextFromFile = async (filePath, mimetype) => {
  if (mimetype === 'application/pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const { value } = await mammoth.extractRawText({ path: filePath });
    return value;
  } else if (mimetype === 'text/plain') {
    return fs.readFileSync(filePath, 'utf8');
  } else {
    return 'Unsupported file type';
  }
}; 