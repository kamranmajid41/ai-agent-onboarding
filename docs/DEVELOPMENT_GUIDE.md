# Development Guide - AI Agent Self-Onboarding Platform

## Overview

This guide provides comprehensive instructions for developers working on the AI Agent Self-Onboarding Platform. It covers development setup, coding standards, testing procedures, and deployment workflows.

## Development Environment Setup

### Prerequisites
- **Node.js**: Version 16 or higher
- **npm**: Latest version
- **Git**: Version control system
- **MongoDB**: Local installation or Atlas account
- **Code Editor**: VS Code recommended with extensions

### Required Extensions (VS Code)
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Initial Setup
1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd ai-agent-onboarding
   ```

2. **Install Dependencies**
   ```bash
   # Backend dependencies
   cd backend
   npm install

   # Frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Backend environment
   cd backend
   cp .env.example .env
   # Configure environment variables

   # Frontend environment
   cd ../frontend
   cp .env.example .env.local
   # Configure environment variables
   ```

4. **Start Development Servers**
   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run dev

   # Frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

## Project Structure

### Frontend Structure
```
frontend/src/
├── components/           # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat interface components
│   ├── dashboard/      # Dashboard components
│   ├── onboarding/     # Onboarding wizard components
│   └── ui/             # Base UI components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Next.js pages and routing
├── services/           # API service layer
├── utils/              # Utility functions
└── styles/             # Global styles and Tailwind config
```

### Backend Structure
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

## Coding Standards

### JavaScript/React Standards

#### Component Structure
```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2, onAction }) => {
  // State declarations
  const [state, setState] = useState(initialValue);

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Event handlers
  const handleAction = () => {
    // Handler logic
  };

  // Render
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onAction: PropTypes.func.isRequired
};

ComponentName.defaultProps = {
  prop2: 0
};

export default ComponentName;
```

#### Naming Conventions
- **Components**: PascalCase (e.g., `DashboardOverview`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase (e.g., `userData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Functions**: camelCase (e.g., `handleSubmit`)

#### Import Organization
```javascript
// React imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Third-party imports
import axios from 'axios';
import { toast } from 'react-toastify';

// Local imports
import { Button } from '../ui';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/dateUtils';
```

### CSS/Tailwind Standards

#### Class Organization
```jsx
// Order: Layout > Spacing > Typography > Colors > Effects
<div className="
  flex items-center justify-between
  p-4 mb-6
  text-lg font-semibold
  text-surface-900
  bg-white rounded-lg shadow-sm
">
```

#### Custom Components
```javascript
// ui/Button.jsx
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-surface-100 hover:bg-surface-200 text-surface-900',
    outline: 'border border-surface-300 hover:bg-surface-50 text-surface-700'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Backend Standards

#### Controller Structure
```javascript
// controllers/authController.js
const authController = {
  async register(req, res) {
    try {
      // Validation
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // Business logic
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        email,
        password: hashedPassword
      });

      // Response
      const token = generateToken(user._id);
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};
```

#### Route Organization
```javascript
// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration } = require('../middleware/validation');

router.post('/register', validateRegistration, authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;
```

## Testing Strategy

### Frontend Testing

#### Unit Tests (Jest + React Testing Library)
```javascript
// __tests__/components/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/ui/Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="outline">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('border-surface-300');
  });
});
```

#### Integration Tests
```javascript
// __tests__/integration/onboarding.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OnboardingStepper } from '../../components/onboarding/OnboardingStepper';

describe('Onboarding Integration', () => {
  it('validates required fields before proceeding', async () => {
    render(<OnboardingStepper />);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please fill in all required fields')).toBeInTheDocument();
    });
  });
});
```

### Backend Testing

#### Unit Tests (Jest)
```javascript
// __tests__/controllers/authController.test.js
const authController = require('../../src/controllers/authController');
const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');

jest.mock('../../src/models/User');
jest.mock('bcryptjs');

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.create.mockResolvedValue({
        _id: 'user123',
        email: 'test@example.com'
      });

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User registered successfully'
      });
    });
  });
});
```

#### API Tests (Supertest)
```javascript
// __tests__/api/auth.test.js
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/User');

describe('Auth API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
    });

    it('should return error for invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
```

## Development Workflow

### Git Workflow

#### Branch Naming
- **Feature branches**: `feature/component-name`
- **Bug fixes**: `fix/issue-description`
- **Hotfixes**: `hotfix/critical-fix`
- **Documentation**: `docs/documentation-update`

#### Commit Messages
```bash
# Format: type(scope): description
git commit -m "feat(auth): add password reset functionality"
git commit -m "fix(onboarding): resolve file upload validation issue"
git commit -m "docs(readme): update installation instructions"
```

#### Pull Request Process
1. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/new-feature
   # Create pull request on GitHub
   ```

4. **Code review and merge**
   - Request review from team members
   - Address feedback and make changes
   - Merge after approval

### Code Review Checklist

#### Frontend Review
- [ ] Component follows naming conventions
- [ ] Props are properly typed with PropTypes
- [ ] Component is accessible (ARIA labels, keyboard navigation)
- [ ] Styling uses Tailwind classes consistently
- [ ] Error handling is implemented
- [ ] Loading states are handled
- [ ] Component is responsive

#### Backend Review
- [ ] Controller follows error handling pattern
- [ ] Input validation is implemented
- [ ] Database queries are optimized
- [ ] Security measures are in place
- [ ] API responses are consistent
- [ ] Logging is implemented for debugging

### Performance Considerations

#### Frontend Optimization
```javascript
// Lazy loading components
const DashboardAnalytics = lazy(() => import('./DashboardAnalytics'));

// Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Debounced search
const debouncedSearch = useCallback(
  debounce((query) => {
    performSearch(query);
  }, 300),
  []
);
```

#### Backend Optimization
```javascript
// Database indexing
// models/User.js
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Caching frequently accessed data
const cache = new Map();
const getCachedData = async (key) => {
  if (cache.has(key)) {
    return cache.get(key);
  }
  const data = await fetchData(key);
  cache.set(key, data);
  return data;
};
```

## Debugging and Troubleshooting

### Frontend Debugging

#### React DevTools
- Install React Developer Tools browser extension
- Use Components tab to inspect component hierarchy
- Use Profiler tab to identify performance issues

#### Console Debugging
```javascript
// Add debug logs
console.log('Component state:', state);
console.log('Props received:', props);

// Use debugger statement
debugger;
```

#### Error Boundaries
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### Backend Debugging

#### Logging
```javascript
// Add structured logging
const logger = require('../utils/logger');

logger.info('User registration attempt', {
  email: req.body.email,
  timestamp: new Date().toISOString()
});

logger.error('Database connection failed', {
  error: error.message,
  stack: error.stack
});
```

#### API Testing
```bash
# Test API endpoints
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Security Best Practices

### Frontend Security
```javascript
// Sanitize user input
import DOMPurify from 'dompurify';
const sanitizedContent = DOMPurify.sanitize(userInput);

// Validate file uploads
const validateFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
};
```

### Backend Security
```javascript
// Input validation
const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Rate limiting
const rateLimit = require('express-rate-limit');
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});
```

## Documentation Standards

### Code Documentation
```javascript
/**
 * Validates user registration data
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email address
 * @param {string} userData.password - User password
 * @returns {Object} Validation result with success status and errors
 */
const validateRegistration = (userData) => {
  const errors = [];
  
  if (!userData.email) {
    errors.push('Email is required');
  }
  
  if (!userData.password || userData.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

### API Documentation
```javascript
/**
 * @api {post} /api/auth/register Register new user
 * @apiName RegisterUser
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email User email address
 * @apiParam {String} password User password (min 8 characters)
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {String} message Success message
 * @apiSuccess {String} token JWT authentication token
 * @apiSuccess {Object} user User information
 *
 * @apiError {Boolean} success Success status (false)
 * @apiError {String} message Error message
 */
```

## Deployment Preparation

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] Code review completed
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Monitoring tools configured
- [ ] Backup strategy implemented

### Build Optimization
```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    optimizeCss: true
  }
};
```

### Environment-specific Configuration
```javascript
// config/database.js
const config = {
  development: {
    url: process.env.MONGODB_URI_DEV
  },
  production: {
    url: process.env.MONGODB_URI_PROD
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
``` 