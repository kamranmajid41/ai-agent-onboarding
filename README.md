# AI Agent Self-Onboarding Platform

## Overview

This platform enables businesses to autonomously onboard AI agents through a modern, multi-step wizard interface. The system provides comprehensive agent management, analytics, and configuration capabilities within a secure, accessible dashboard environment.

## Core Features

### Onboarding System
- **Multi-Step Wizard**: Progressive 5-step onboarding with real-time validation
- **File Processing**: PDF, DOCX, and text file content extraction
- **Web Integration**: Website crawling and document link processing
- **AI Configuration**: Agent personality, voice settings, and business hours setup

### Authentication & Security
- **User Management**: Registration, login, and password reset functionality
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Admin and user permission systems
- **Data Protection**: GDPR compliance and privacy controls

### Dashboard & Analytics
- **Real-Time Metrics**: Agent performance and usage analytics
- **Status Monitoring**: Live agent status and integration health
- **Conversation Management**: Chat interface and message history
- **Settings Configuration**: Comprehensive agent and system settings

### AI Integration
- **OpenAI Integration**: Advanced AI capabilities and chat functionality
- **GoHighLevel CRM**: Third-party integration for contact management
- **Knowledge Base**: Dynamic content processing and context building
- **Chat Interface**: Real-time communication with AI agents

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context and hooks
- **UI Components**: Custom component library with accessibility features

### Backend Stack
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **File Storage**: AWS S3 integration
- **AI Services**: OpenAI API integration

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint and Prettier
- **Version Control**: Git
- **Deployment**: Multiple hosting platform support

## Project Structure

```
ai-agent-onboarding/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Next.js pages and routing
│   │   ├── contexts/       # React context providers
│   │   ├── services/       # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── styles/             # Global styles and Tailwind config
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic services
│   │   ├── middleware/     # Express middleware
│   │   └── config/         # Configuration files
│   └── tests/              # Backend test suite
├── docs/                   # Technical documentation
├── design/                 # Design specifications
└── prototypes/             # Interactive prototypes
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm package manager
- MongoDB database (local or Atlas)
- AWS S3 bucket for file storage
- OpenAI API key

### Environment Configuration

**Backend Environment Variables**
```bash
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
OPENAI_API_KEY=your_openai_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket_name
CLIENT_URL=http://localhost:3000
```

**Frontend Environment Variables**
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### Development Setup

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd ai-agent-onboarding
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure environment variables
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Configure environment variables
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Key Components

### Onboarding Wizard
The onboarding process consists of five sequential steps:

1. **Business Profile**: Company information, industry type, and contact details
2. **Asset Upload**: Document uploads, website crawling, and knowledge base building
3. **Agent Configuration**: Personality settings, service offerings, and fallback behavior
4. **Voice Settings**: Voice selection, speed configuration, and preview functionality
5. **Deployment**: Final configuration review and agent activation

### Dashboard Features
- **Overview Tab**: Key metrics, progress indicators, and quick actions
- **Analytics Tab**: Performance charts, usage statistics, and trend analysis
- **Agents Tab**: Agent status monitoring and health checks
- **Conversations Tab**: Chat interface and message history
- **Settings Tab**: System configuration and integration management

### Authentication System
- **Registration**: Email-based account creation with validation
- **Login**: Secure authentication with JWT tokens
- **Password Reset**: Email-based password recovery
- **Session Management**: Automatic token refresh and logout

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Onboarding
- `GET /api/onboarding/progress` - Get onboarding progress
- `POST /api/onboarding/step/:step` - Submit onboarding step data
- `GET /api/onboarding/complete` - Check completion status

### File Management
- `POST /api/files/upload` - Upload documents
- `POST /api/files/crawl` - Crawl website content
- `POST /api/files/doclink` - Process document links

### Agent Management
- `POST /api/agents/chat` - Send message to AI agent
- `GET /api/agents/status` - Get agent status
- `POST /api/agents/configure` - Configure agent settings

## Development Guidelines

### Code Standards
- **JavaScript**: ES6+ syntax with consistent formatting
- **React**: Functional components with hooks
- **CSS**: Tailwind utility classes with custom components
- **API**: RESTful endpoints with proper error handling

### Testing Strategy
- **Unit Tests**: Component and service testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User flow testing with Playwright

### Deployment
- **Frontend**: Static site generation with Next.js
- **Backend**: Node.js server with PM2 process management
- **Database**: MongoDB Atlas for production
- **File Storage**: AWS S3 for document storage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For technical support or feature requests, please create an issue in the repository or contact the development team.
