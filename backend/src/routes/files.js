const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const UploadedAsset = require('../models/UploadedAsset');
const { protect } = require('../middleware/auth');
const path = require('path');
const filesController = require('../controllers/filesController');
const axios = require('axios');
const cheerio = require('cheerio');

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

// @route   POST /api/files/crawl
// @desc    Crawl a website and extract text content
// @access  Private
router.post('/crawl', protect, async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: 'URL is required' });
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // Extract text from common elements, you might want to refine this
    const extractedText = $('p, h1, h2, h3, h4, h5, h6, li, span').text();

    // Save the crawled content as an uploaded asset (optional, but useful for agent context)
    const newAsset = new UploadedAsset({
      user: req.user.id,
      fileName: url,
      fileType: 'text/html',
      s3Url: '', // No S3 URL for crawled content directly
      extractedText: extractedText,
      source: 'web_crawl',
    });
    await newAsset.save();

    res.json({ success: true, msg: 'Web content crawled and saved', extractedText });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
});

// @route   POST /api/files/doclink
// @desc    Fetch content from a public document link (e.g., Google Docs, Notion public share)
// @access  Private
router.post('/doclink', protect, async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: 'URL is required' });
  }

  try {
    const response = await axios.get(url);
    // For document links, we'll try to extract text directly from the response
    // This might need more sophisticated parsing based on the document type
    const extractedText = response.data; // This is a simplistic approach

    const newAsset = new UploadedAsset({
      user: req.user.id,
      fileName: url,
      fileType: 'text/plain', // Assuming plain text for now, can be improved
      s3Url: '', // No S3 URL for doclink content directly
      extractedText: extractedText,
      source: 'doc_link',
    });
    await newAsset.save();

    res.json({ success: true, msg: 'Document link content fetched and saved', extractedText });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
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