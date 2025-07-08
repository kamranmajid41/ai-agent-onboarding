const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const UploadedAsset = require('../models/UploadedAsset');
const { protect } = require('../middleware/auth');
const path = require('path');
const filesController = require('../controllers/filesController');

const router = express.Router();

// Multer config (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.docx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error('Only .pdf, .docx, .txt files are allowed'));
    }
    cb(null, true);
  }
});

// AWS S3 config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const S3_BUCKET = process.env.AWS_S3_BUCKET;

// Upload endpoint
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const ext = path.extname(req.file.originalname).toLowerCase();
    const key = `uploads/${req.user.id}/${uuidv4()}${ext}`;
    // Upload to S3
    const s3Res = await s3.upload({
      Bucket: S3_BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'private'
    }).promise();
    // Extract text from file
    const extractedText = await filesController.extractTextFromFile(req.file.buffer, req.file.originalname);
    // Save metadata
    const asset = await UploadedAsset.create({
      user: req.user.id,
      fileUrl: s3Res.Location,
      originalName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      extractedText
    });
    res.status(201).json({ success: true, asset });
  } catch (err) {
    console.error('File upload error:', err);
    res.status(500).json({ success: false, message: 'File upload failed', error: err.message });
  }
});

router.post('/crawl', protect, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ success: false, message: 'No URL provided' });
    // TODO: Implement actual crawling logic
    const extractedText = '[Crawled text placeholder]';
    res.status(200).json({ success: true, extractedText });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to crawl website', error: err.message });
  }
});

router.post('/doclink', protect, async (req, res) => {
  try {
    const { link } = req.body;
    if (!link) return res.status(400).json({ success: false, message: 'No link provided' });
    // TODO: Implement actual Google Docs/Notion fetching logic
    const extractedText = '[Doc link text placeholder]';
    res.status(200).json({ success: true, extractedText });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch doc link', error: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const assets = await UploadedAsset.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, assets });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch files', error: err.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const asset = await UploadedAsset.findOne({ _id: req.params.id, user: req.user.id });
    if (!asset) return res.status(404).json({ success: false, message: 'File not found' });
    res.status(200).json({ success: true, asset });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch file', error: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const asset = await UploadedAsset.findOne({ _id: req.params.id, user: req.user.id });
    if (!asset) return res.status(404).json({ success: false, message: 'File not found' });
    // Remove from S3
    const urlParts = asset.fileUrl.split('/');
    const key = urlParts.slice(3).join('/');
    await s3.deleteObject({ Bucket: S3_BUCKET, Key: key }).promise();
    // Remove from DB
    await asset.remove();
    res.status(200).json({ success: true, message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete file', error: err.message });
  }
});

module.exports = router; 