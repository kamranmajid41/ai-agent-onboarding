# Technical Documentation - AI Agent Self-Onboarding Platform

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [Database Schema](#database-schema)
5. [API Documentation](#api-documentation)
6. [Component Documentation](#component-documentation)
7. [State Management](#state-management)
8. [Authentication System](#authentication-system)
9. [File Processing System](#file-processing-system)
10. [AI Integration](#ai-integration)
11. [Deployment Guide](#deployment-guide)
12. [Development Workflow](#development-workflow)

## Architecture Overview

The AI Agent Self-Onboarding Platform follows a modern full-stack architecture with clear separation of concerns:

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   External      │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   Services      │
│                 │    │                 │    │                 │
│ • React 18      │    │ • Express.js    │    │ • OpenAI API    │
│ • Next.js 14    │    │ • MongoDB       │    │ • AWS S3        │
│ • Tailwind CSS  │    │ • JWT Auth      │    │ • GoHighLevel   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT with bcrypt
- **File Storage**: AWS S3
- **AI Services**: OpenAI API
- **CRM Integration**: GoHighLevel API

## Frontend Architecture

### Project Structure
```
frontend/src/
├── components/           # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat interface components
│   ├── dashboard/      # Dashboard-specific components
│   ├── onboarding/     # Onboarding wizard components
│   └── ui/             # Base UI components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Next.js pages and routing
├── services/           # API service layer
└── utils/              # Utility functions
```

### Key Components

#### Authentication Components
- **LoginForm**: User authentication with validation
- **RegisterForm**: User registration with field validation
- **ForgotPassword**: Password reset functionality
- **ProtectedRoute**: Route protection middleware

#### Dashboard Components
- **DashboardOverview**: Main dashboard with metrics
- **DashboardOnboarding**: Onboarding progress display
- **DashboardAgents**: Agent status monitoring
- **DashboardAnalytics**: Analytics and reporting
- **DashboardSettings**: System configuration

#### Onboarding Components
- **OnboardingStepper**: Multi-step wizard interface
- **Step Components**: Individual step implementations
- **Progress Indicators**: Visual progress tracking

#### UI Components
- **Button**: Reusable button component with variants
- **Card**: Container component with styling options
- **Input**: Form input with validation support
- **Tooltip**: Information display component
- **Toast**: Notification system

### State Management

#### Context Providers
```javascript
// AuthContext.js
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {}
});
```

#### Custom Hooks
```javascript
// useAuth.js
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## Backend Architecture

### Project Structure
```
backend/src/
├── config/             # Configuration files
├── controllers/        # Request handlers
├── middleware/         # Express middleware
├── models/            # Database schemas
├── routes/            # API route definitions
├── services/          # Business logic services
└── utils/             # Utility functions
```

### Core Modules

#### Authentication Controller
```javascript
// authController.js
class AuthController {
  async register(req, res) { /* User registration logic */ }
  async login(req, res) { /* User authentication logic */ }
  async forgotPassword(req, res) { /* Password reset logic */ }
}
```

#### File Processing Controller
```javascript
// filesController.js
class FilesController {
  async uploadFile(req, res) { /* File upload processing */ }
  async crawlWebsite(req, res) { /* Web content extraction */ }
  async processDocumentLink(req, res) { /* Document processing */ }
}
```

#### Agent Management Controller
```javascript
// agentsController.js
class AgentsController {
  async chat(req, res) { /* AI chat processing */ }
  async getStatus(req, res) { /* Agent status retrieval */ }
  async configure(req, res) { /* Agent configuration */ }
}
```

## Database Schema

### User Model
```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  onboardingData: {
    step1: { type: Object },
    step2: { type: Object },
    step3: { type: Object },
    step4: { type: Object },
    step5: { type: Object }
  },
  settings: {
    agentName: String,
    welcomeMessage: String,
    emailNotifications: Boolean,
    marketingEmails: Boolean,
    aiUsage: Boolean,
    gdpr: Boolean
  },
  integrations: {
    goHighLevel: {
      connected: Boolean,
      apiKey: String,
      locationId: String
    }
  }
});
```

### UploadedAsset Model
```javascript
const uploadedAssetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  fileUrl: String,
  source: { type: String, enum: ['upload', 'crawl', 'doclink'] },
  content: String,
  uploadedAt: { type: Date, default: Date.now }
});
```

### ConversationLog Model
```javascript
const conversationLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'] },
    content: String,
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### POST /api/auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### File Management Endpoints

#### POST /api/files/upload
Upload and process documents.

**Request:**
- Content-Type: multipart/form-data
- Body: file field with document

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "file": {
    "id": "file_id",
    "filename": "document.pdf",
    "size": 1024000,
    "content": "extracted_text_content"
  }
}
```

#### POST /api/files/crawl
Crawl website content.

**Request Body:**
```json
{
  "url": "https://example.com",
  "includeLinks": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Website crawled successfully",
  "content": "extracted_website_content",
  "links": ["url1", "url2"]
}
```

### Agent Management Endpoints

#### POST /api/agents/chat
Send message to AI agent.

**Request Body:**
```json
{
  "message": "Hello, how can you help me?",
  "context": "user_context_data"
}
```

**Response:**
```json
{
  "success": true,
  "message": "AI response message",
  "conversationId": "conversation_id"
}
```

## Component Documentation

### OnboardingStepper Component

**Purpose**: Manages the multi-step onboarding process.

**Props:**
```javascript
{
  onboardingData: Object,
  onSave: Function,
  loading: Boolean
}
```

**State Management:**
```javascript
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});
```

**Key Features:**
- Step validation and progression control
- Real-time form validation
- File upload handling
- Progress persistence

### DashboardOverview Component

**Purpose**: Displays key metrics and quick actions.

**Props:**
```javascript
{
  metrics: Object,
  onboardingData: Object,
  setActiveTab: Function
}
```

**Features:**
- Real-time metrics display
- Progress indicators
- Quick action buttons
- Responsive grid layout

### ChatInterface Component

**Purpose**: Provides real-time chat functionality.

**Props:**
```javascript
{
  agentName: String,
  welcomeMessage: String,
  onSendMessage: Function
}
```

**Features:**
- Real-time message display
- Message input with validation
- Loading states
- Error handling

## State Management

### Authentication State
```javascript
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    // Authentication logic
  };

  const logout = () => {
    // Logout logic
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Onboarding State
```javascript
const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const updateStep = (step, data) => {
    // Step update logic
  };

  return (
    <OnboardingContext.Provider value={{ 
      onboardingData, 
      currentStep, 
      updateStep 
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};
```

## Authentication System

### JWT Implementation
```javascript
// Token generation
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Token verification middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
```

### Password Security
```javascript
// Password hashing
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

// Password verification
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
```

## File Processing System

### Document Extraction
```javascript
// PDF processing
const extractPDFContent = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text;
};

// DOCX processing
const extractDOCXContent = async (buffer) => {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
};
```

### Web Crawling
```javascript
const crawlWebsite = async (url) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const text = $('body').text();
  return text.trim();
};
```

## AI Integration

### OpenAI Service
```javascript
class OpenAIService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async generateResponse(message, context) {
    const completion = await this.client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: context },
        { role: "user", content: message }
      ]
    });
    return completion.choices[0].message.content;
  }
}
```

### Context Building
```javascript
const buildContext = (userData, uploadedFiles) => {
  let context = `You are an AI assistant for ${userData.businessName}. `;
  context += `Business type: ${userData.industryType}. `;
  context += `Services: ${userData.services.join(', ')}. `;
  
  if (uploadedFiles.length > 0) {
    context += `Knowledge base: ${uploadedFiles.map(f => f.content).join(' ')}`;
  }
  
  return context;
};
```

## Deployment Guide

### Environment Setup
1. **Production Environment Variables**
   ```bash
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   AWS_S3_BUCKET=your_s3_bucket
   ```

2. **Frontend Build**
   ```bash
   cd frontend
   npm run build
   npm start
   ```

3. **Backend Deployment**
   ```bash
   cd backend
   npm install --production
   npm start
   ```

### Hosting Platforms

#### Vercel (Frontend)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ]
}
```

#### Railway (Backend)
```json
{
  "name": "ai-agent-backend",
  "scripts": {
    "start": "node src/index.js"
  }
}
```

## Development Workflow

### Code Standards
- **JavaScript**: ES6+ syntax, consistent formatting
- **React**: Functional components with hooks
- **CSS**: Tailwind utility classes
- **API**: RESTful endpoints with proper error handling

### Testing Strategy
```javascript
// Unit test example
describe('AuthController', () => {
  it('should register a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const result = await authController.register(userData);
    expect(result.success).toBe(true);
  });
});
```

### Git Workflow
1. Create feature branch
2. Implement changes with tests
3. Run linting and formatting
4. Submit pull request
5. Code review and merge

### Performance Optimization
- **Frontend**: Code splitting, lazy loading
- **Backend**: Database indexing, caching
- **File Processing**: Stream processing for large files
- **AI Integration**: Request batching and caching 