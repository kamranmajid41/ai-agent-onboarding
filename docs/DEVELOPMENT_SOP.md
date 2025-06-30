# AI Agent Self-Onboarding Platform - Development SOP

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Frontend Development Guide](#frontend-development-guide)
4. [Backend Development Guide](#backend-development-guide)
5. [API Integration Guide](#api-integration-guide)
6. [Database Schema](#database-schema)
7. [File Processing Pipeline](#file-processing-pipeline)
8. [Security & Compliance](#security--compliance)
9. [Deployment Guide](#deployment-guide)
10. [Testing Strategy](#testing-strategy)

---

## Project Overview

### Goal
Enable businesses to autonomously onboard AI agents (chat + voice) by uploading essential company data, documents, and preferences with zero vendor intervention.

### Core Features
- **5-Step Onboarding Wizard** with conditional logic
- **File Upload & Processing** (PDF, DOC, TXT, website crawling)
- **Real-time AI Agent Preview** with chat interface
- **Social Media Validation** integration
- **Performance Dashboard** with analytics
- **GoHighLevel API Integration** for CRM workflows

---

## Technical Architecture

### Tech Stack
```
Frontend: React.js (Next.js recommended)
Backend: Node.js + Express (or Python + FastAPI)
Database: Firebase Firestore (or PostgreSQL)
File Storage: AWS S3 (or Firebase Storage)
AI Processing: OpenAI API + LangChain
CRM Integration: GoHighLevel API
Hosting: Vercel (Frontend) + Railway/Heroku (Backend)
```

### System Architecture Diagram
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   External      │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   Services      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Firebase      │    │   GoHighLevel   │
│   (Hosting)     │    │   (Database)    │    │   (CRM)         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   AWS S3        │
                       │   (File Storage)│
                       └─────────────────┘
```

---

## Frontend Development Guide

### Project Structure
```
frontend/
├── components/
│   ├── onboarding/
│   │   ├── Step1BusinessProfile.jsx
│   │   ├── Step2UploadAssets.jsx
│   │   ├── Step3AgentPersonality.jsx
│   │   ├── Step4PreviewTest.jsx
│   │   └── Step5Success.jsx
│   ├── dashboard/
│   │   ├── MetricsOverview.jsx
│   │   ├── PerformanceCharts.jsx
│   │   └── SocialValidation.jsx
│   ├── common/
│   │   ├── FileUpload.jsx
│   │   ├── ProgressBar.jsx
│   │   └── ChatPreview.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       └── Dropdown.jsx
├── pages/
│   ├── onboarding/
│   ├── dashboard/
│   └── settings/
├── hooks/
│   ├── useOnboarding.js
│   ├── useFileUpload.js
│   └── useGoHighLevel.js
├── services/
│   ├── api.js
│   ├── fileUpload.js
│   └── goHighLevel.js
└── utils/
    ├── validation.js
    ├── constants.js
    └── helpers.js
```

### Key Components Development

#### 1. Onboarding Wizard Container
```javascript
// components/onboarding/OnboardingWizard.jsx
import { useState } from 'react';
import Step1BusinessProfile from './Step1BusinessProfile';
import Step2UploadAssets from './Step2UploadAssets';
import Step3AgentPersonality from './Step3AgentPersonality';
import Step4PreviewTest from './Step4PreviewTest';
import Step5Success from './Step5Success';

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  
  const steps = [
    { id: 1, component: Step1BusinessProfile, title: "Business Profile" },
    { id: 2, component: Step2UploadAssets, title: "Upload Assets" },
    { id: 3, component: Step3AgentPersonality, title: "Agent Personality" },
    { id: 4, component: Step4PreviewTest, title: "Preview & Test" },
    { id: 5, component: Step5Success, title: "Success" }
  ];

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="onboarding-wizard">
      <ProgressBar currentStep={currentStep} totalSteps={5} />
      {steps[currentStep - 1].component({
        formData,
        onNext: handleNext,
        onBack: handleBack,
        currentStep
      })}
    </div>
  );
};
```

#### 2. File Upload Component
```javascript
// components/common/FileUpload.jsx
import { useState } from 'react';
import { uploadFile } from '../../services/fileUpload';

const FileUpload = ({ onUploadComplete, acceptedTypes = ['.pdf', '.docx', '.txt'] }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (files) => {
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => 
        uploadFile(file, (progress) => setProgress(progress))
      );
      
      const results = await Promise.all(uploadPromises);
      onUploadComplete(results);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={(e) => handleFileUpload(e.target.files)}
        disabled={uploading}
      />
      {uploading && <ProgressBar progress={progress} />}
    </div>
  );
};
```

#### 3. Chat Preview Component
```javascript
// components/common/ChatPreview.jsx
import { useState, useEffect } from 'react';
import { testAgent } from '../../services/api';

const ChatPreview = ({ agentConfig }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { type: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await testAgent(agentConfig, input);
      const botMessage = { type: 'bot', content: response, timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-preview">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="loading">AI is typing...</div>}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Test your AI agent..."
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};
```

### State Management
Use React Context or Zustand for global state management:

```javascript
// hooks/useOnboarding.js
import { create } from 'zustand';

const useOnboardingStore = create((set, get) => ({
  // Form data
  businessProfile: {},
  uploadedAssets: [],
  agentConfig: {},
  
  // UI state
  currentStep: 1,
  isLoading: false,
  errors: {},
  
  // Actions
  updateBusinessProfile: (data) => set(state => ({
    businessProfile: { ...state.businessProfile, ...data }
  })),
  
  addUploadedAsset: (asset) => set(state => ({
    uploadedAssets: [...state.uploadedAssets, asset]
  })),
  
  updateAgentConfig: (config) => set(state => ({
    agentConfig: { ...state.agentConfig, ...config }
  })),
  
  nextStep: () => set(state => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set(state => ({ currentStep: state.currentStep - 1 })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (field, error) => set(state => ({
    errors: { ...state.errors, [field]: error }
  }))
}));
```

---

## ⚙️ Backend Development Guide

### Project Structure
```
backend/
├── src/
│   ├── controllers/
│   │   ├── onboardingController.js
│   │   ├── fileController.js
│   │   ├── agentController.js
│   │   └── dashboardController.js
│   ├── services/
│   │   ├── fileProcessingService.js
│   │   ├── goHighLevelService.js
│   │   ├── openAIService.js
│   │   └── webCrawlerService.js
│   ├── models/
│   │   ├── Business.js
│   │   ├── Agent.js
│   │   └── Upload.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── fileUpload.js
│   ├── routes/
│   │   ├── onboarding.js
│   │   ├── files.js
│   │   ├── agents.js
│   │   └── dashboard.js
│   └── utils/
│       ├── database.js
│       ├── encryption.js
│       └── helpers.js
├── config/
│   ├── database.js
│   └── aws.js
├── tests/
└── package.json
```

### API Endpoints

#### Onboarding Endpoints
```javascript
// routes/onboarding.js
const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/onboardingController');

// Step 1: Business Profile
router.post('/business-profile', onboardingController.saveBusinessProfile);

// Step 2: File Upload
router.post('/upload-assets', fileUpload.single('file'), onboardingController.uploadAssets);
router.post('/crawl-website', onboardingController.crawlWebsite);

// Step 3: Agent Configuration
router.post('/agent-config', onboardingController.saveAgentConfig);

// Step 4: Test Agent
router.post('/test-agent', onboardingController.testAgent);

// Step 5: Deploy Agent
router.post('/deploy-agent', onboardingController.deployAgent);
```

#### File Processing Service
```javascript
// services/fileProcessingService.js
const { PDFExtract } = require('pdf.js-extract');
const mammoth = require('mammoth');
const fs = require('fs');

class FileProcessingService {
  async processPDF(filePath) {
    const pdfExtract = new PDFExtract();
    const options = {};
    
    try {
      const data = await pdfExtract.extract(filePath, options);
      return data.pages.map(page => page.content.map(item => item.str).join(' ')).join('\n');
    } catch (error) {
      throw new Error(`PDF processing failed: ${error.message}`);
    }
  }

  async processDOCX(filePath) {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } catch (error) {
      throw new Error(`DOCX processing failed: ${error.message}`);
    }
  }

  async processTXT(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      throw new Error(`TXT processing failed: ${error.message}`);
    }
  }

  async processFile(filePath, fileType) {
    switch (fileType.toLowerCase()) {
      case '.pdf':
        return await this.processPDF(filePath);
      case '.docx':
        return await this.processDOCX(filePath);
      case '.txt':
        return await this.processTXT(filePath);
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  }
}

module.exports = new FileProcessingService();
```

#### Web Crawler Service
```javascript
// services/webCrawlerService.js
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

class WebCrawlerService {
  async crawlWebsite(url, pages = ['homepage', 'services', 'about', 'contact', 'faqs']) {
    const browser = await puppeteer.launch({ headless: true });
    const content = {};

    try {
      const page = await browser.newPage();
      
      for (const pageName of pages) {
        const pageUrl = this.getPageUrl(url, pageName);
        await page.goto(pageUrl, { waitUntil: 'networkidle2' });
        
        const html = await page.content();
        const $ = cheerio.load(html);
        
        // Extract relevant content
        content[pageName] = {
          title: $('title').text(),
          headings: $('h1, h2, h3').map((i, el) => $(el).text()).get(),
          paragraphs: $('p').map((i, el) => $(el).text()).get(),
          links: $('a').map((i, el) => $(el).attr('href')).get()
        };
      }
    } finally {
      await browser.close();
    }

    return content;
  }

  getPageUrl(baseUrl, pageName) {
    const pageMap = {
      homepage: baseUrl,
      services: `${baseUrl}/services`,
      about: `${baseUrl}/about`,
      contact: `${baseUrl}/contact`,
      faqs: `${baseUrl}/faqs`
    };
    return pageMap[pageName] || baseUrl;
  }
}

module.exports = new WebCrawlerService();
```

---

## 🔌 API Integration Guide

### GoHighLevel API Integration

#### Service Setup
```javascript
// services/goHighLevelService.js
const axios = require('axios');

class GoHighLevelService {
  constructor() {
    this.baseURL = process.env.GOHIGHLEVEL_API_URL;
    this.apiKey = process.env.GOHIGHLEVEL_API_KEY;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async createContact(businessData) {
    try {
      const contactData = {
        email: businessData.email,
        firstName: businessData.businessName,
        phone: businessData.phone,
        address: businessData.address,
        customField: {
          businessType: businessData.industry,
          website: businessData.website
        }
      };

      const response = await this.client.post('/contacts/', contactData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create GoHighLevel contact: ${error.message}`);
    }
  }

  async setupWorkflow(businessId, agentConfig) {
    try {
      const workflowData = {
        name: `${agentConfig.businessName} AI Agent Workflow`,
        triggers: [
          {
            type: 'chat_message',
            conditions: {
              agentId: agentConfig.agentId
            }
          }
        ],
        actions: [
          {
            type: 'send_email',
            config: {
              template: 'ai_agent_notification',
              to: agentConfig.email
            }
          },
          {
            type: 'create_task',
            config: {
              title: 'New AI Agent Lead',
              description: 'Lead captured by AI agent'
            }
          }
        ]
      };

      const response = await this.client.post('/workflows/', workflowData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to setup GoHighLevel workflow: ${error.message}`);
    }
  }

  async configureChatbot(agentConfig) {
    try {
      const chatbotData = {
        name: `${agentConfig.businessName} AI Agent`,
        welcomeMessage: agentConfig.welcomeMessage,
        fallbackMessage: agentConfig.fallbackMessage,
        businessHours: agentConfig.businessHours,
        services: agentConfig.services
      };

      const response = await this.client.post('/chatbots/', chatbotData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to configure GoHighLevel chatbot: ${error.message}`);
    }
  }
}

module.exports = new GoHighLevelService();
```

#### OpenAI Integration
```javascript
// services/openAIService.js
const OpenAI = require('openai');

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async summarizeContent(content) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes business content for AI agent training."
          },
          {
            role: "user",
            content: `Please summarize the following business content in a concise way that would be useful for training an AI agent: ${content}`
          }
        ],
        max_tokens: 500
      });

      return response.choices[0].message.content;
    } catch (error) {
      throw new Error(`OpenAI summarization failed: ${error.message}`);
    }
  }

  async generateAgentPrompt(businessData, uploadedContent) {
    try {
      const prompt = `Create an AI agent prompt for a ${businessData.industry} business called "${businessData.businessName}". 
      
      Business details: ${JSON.stringify(businessData)}
      
      Uploaded content: ${uploadedContent}
      
      The agent should have a ${businessData.personality} personality and focus on: ${businessData.objectives.join(', ')}`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert at creating AI agent prompts for businesses."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000
      });

      return response.choices[0].message.content;
    } catch (error) {
      throw new Error(`Failed to generate agent prompt: ${error.message}`);
    }
  }
}

module.exports = new OpenAIService();
```

---

## 🗄️ Database Schema

### Firebase Firestore Collections

#### Businesses Collection
```javascript
{
  id: "business_123",
  businessName: "Acme Law Firm",
  website: "https://acmelaw.com",
  email: "contact@acmelaw.com",
  phone: "+1-555-0123",
  address: "123 Main St, City, State 12345",
  industry: "Law",
  logo: "https://s3.amazonaws.com/bucket/logo.png",
  socialLinks: {
    instagram: "https://instagram.com/acmelaw",
    facebook: "https://facebook.com/acmelaw",
    linkedin: "https://linkedin.com/company/acmelaw"
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Agents Collection
```javascript
{
  id: "agent_456",
  businessId: "business_123",
  name: "Acme Law AI Assistant",
  personality: "Professional & Efficient",
  objectives: ["Book Appointments", "Answer FAQs", "Capture Leads"],
  services: ["Legal Consultation", "Document Review", "Court Representation"],
  welcomeMessage: "Welcome to Acme Law Firm. How can I assist you today?",
  fallbackMessage: "I'll connect you with our team right away.",
  businessHours: {
    monday: { open: "9:00", close: "17:00" },
    tuesday: { open: "9:00", close: "17:00" },
    // ... other days
  },
  goHighLevelId: "ghl_agent_789",
  status: "active", // active, training, inactive
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Uploads Collection
```javascript
{
  id: "upload_789",
  businessId: "business_123",
  fileName: "services.pdf",
  fileType: "pdf",
  fileSize: 1024000,
  s3Url: "https://s3.amazonaws.com/bucket/services.pdf",
  extractedContent: "Legal services include...",
  processedAt: Timestamp,
  createdAt: Timestamp
}
```

#### Conversations Collection
```javascript
{
  id: "conversation_101",
  agentId: "agent_456",
  businessId: "business_123",
  messages: [
    {
      role: "user",
      content: "I need legal help",
      timestamp: Timestamp
    },
    {
      role: "assistant",
      content: "I'd be happy to help you with legal assistance...",
      timestamp: Timestamp
    }
  ],
  status: "completed", // active, completed, abandoned
  leadCaptured: true,
  appointmentBooked: false,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🔒 Security & Compliance

### File Security
```javascript
// middleware/fileUpload.js
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Max 5 files per request
  }
});

// Encryption middleware
const encryptFile = (buffer) => {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipher(algorithm, key);
  let encrypted = cipher.update(buffer, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    encrypted,
    iv: iv.toString('hex')
  };
};
```

### GDPR Compliance
```javascript
// controllers/gdprController.js
const gdprController = {
  async deleteUserData(req, res) {
    try {
      const { businessId } = req.params;
      
      // Delete from all collections
      await Promise.all([
        db.collection('businesses').doc(businessId).delete(),
        db.collection('agents').where('businessId', '==', businessId).get().then(snapshot => {
          snapshot.docs.forEach(doc => doc.ref.delete());
        }),
        db.collection('uploads').where('businessId', '==', businessId).get().then(snapshot => {
          snapshot.docs.forEach(doc => doc.ref.delete());
        }),
        db.collection('conversations').where('businessId', '==', businessId).get().then(snapshot => {
          snapshot.docs.forEach(doc => doc.ref.delete());
        })
      ]);
      
      // Delete from S3
      await s3Service.deleteBusinessFiles(businessId);
      
      res.json({ success: true, message: 'All data deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
```

---

## 🚀 Deployment Guide

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Backend (.env)
PORT=3001
NODE_ENV=production

# Database
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# APIs
OPENAI_API_KEY=your-openai-key
GOHIGHLEVEL_API_KEY=your-gohighlevel-key
GOHIGHLEVEL_API_URL=https://api.gohighlevel.com/v1

# Security
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
```

### Vercel Deployment (Frontend)
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url"
  }
}
```

### Railway Deployment (Backend)
```yaml
# railway.toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
healthcheckPath = "/health"
healthcheckTimeout = 300
```

---

## 🧪 Testing Strategy

### Frontend Testing
```javascript
// tests/components/OnboardingWizard.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingWizard from '../../components/onboarding/OnboardingWizard';

describe('OnboardingWizard', () => {
  test('renders first step by default', () => {
    render(<OnboardingWizard />);
    expect(screen.getByText('Business Profile')).toBeInTheDocument();
  });

  test('navigates to next step when form is valid', () => {
    render(<OnboardingWizard />);
    
    // Fill required fields
    fireEvent.change(screen.getByLabelText('Business Name'), {
      target: { value: 'Test Business' }
    });
    
    fireEvent.click(screen.getByText('Next'));
    
    expect(screen.getByText('Upload Assets')).toBeInTheDocument();
  });
});
```

### Backend Testing
```javascript
// tests/controllers/onboardingController.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('Onboarding Controller', () => {
  test('POST /api/onboarding/business-profile creates business profile', async () => {
    const businessData = {
      businessName: 'Test Business',
      email: 'test@example.com',
      industry: 'Technology'
    };

    const response = await request(app)
      .post('/api/onboarding/business-profile')
      .send(businessData)
      .expect(201);

    expect(response.body.businessId).toBeDefined();
    expect(response.body.businessName).toBe(businessData.businessName);
  });
});
```

### Integration Testing
```javascript
// tests/integration/onboardingFlow.test.js
describe('Complete Onboarding Flow', () => {
  test('successfully completes full onboarding process', async () => {
    // Step 1: Business Profile
    const businessResponse = await createBusinessProfile(mockBusinessData);
    
    // Step 2: Upload Assets
    const uploadResponse = await uploadFiles(businessResponse.businessId, mockFiles);
    
    // Step 3: Agent Configuration
    const agentResponse = await configureAgent(businessResponse.businessId, mockAgentConfig);
    
    // Step 4: Test Agent
    const testResponse = await testAgent(agentResponse.agentId, "Hello");
    
    // Step 5: Deploy Agent
    const deployResponse = await deployAgent(agentResponse.agentId);
    
    expect(deployResponse.status).toBe('active');
  });
});
```

---

## 📊 Performance Monitoring

### Key Metrics to Track
- **Onboarding Completion Rate**: % of users who complete all 5 steps
- **File Upload Success Rate**: % of successful file uploads
- **Agent Response Time**: Average time for AI agent to respond
- **GoHighLevel Integration Success**: % of successful CRM integrations
- **User Engagement**: Time spent in dashboard, features used

### Monitoring Setup
```javascript
// utils/monitoring.js
const winston = require('winston');
const Sentry = require('@sentry/node');

// Logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Error tracking
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

// Performance monitoring
const trackMetric = (metricName, value, tags = {}) => {
  logger.info('metric', {
    name: metricName,
    value,
    tags,
    timestamp: new Date().toISOString()
  });
};
```

---

## 🔄 Development Workflow

### Git Workflow
1. **Feature Branches**: Create feature branches from `develop`
2. **Pull Requests**: All changes go through PR review
3. **Testing**: Run tests before merging
4. **Deployment**: Auto-deploy to staging on merge to `develop`
5. **Production**: Manual deployment from `main` branch

### Code Quality
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Jest**: Unit and integration testing

---

This SOP provides a comprehensive guide for developing the AI Agent Self-Onboarding Platform.