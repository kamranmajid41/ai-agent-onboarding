const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't include password in queries by default
  },
  company: {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+\..+/, 'Please enter a valid website URL']
    },
    industry: {
      type: String,
      trim: true
    },
    logo: {
      type: String // URL to stored logo
    }
  },
  onboardingData: {
    step1: {
      businessName: String,
      website: String,
      email: String,
      phone: String,
      address: String,
      industry: String,
      logo: String,
      socials: {
        instagram: String,
        facebook: String,
        linkedin: String,
        tiktok: String,
        google: String
      }
    },
    step2: {
      files: [String], // Array of file URLs
      website: String,
      crawl: Boolean,
      pages: {
        homepage: Boolean,
        services: Boolean,
        about: Boolean,
        contact: Boolean,
        faqs: Boolean,
        blog: Boolean
      },
      docLinks: [String]
    },
    step3: {
      objectives: [String],
      personality: String,
      customPersonality: String,
      services: [String],
      fallback: String,
      customFallback: String,
      isBookingEnabled: Boolean,
      businessHours: {
        monday: { open: String, close: String, closed: Boolean },
        tuesday: { open: String, close: String, closed: Boolean },
        wednesday: { open: String, close: String, closed: Boolean },
        thursday: { open: String, close: String, closed: Boolean },
        friday: { open: String, close: String, closed: Boolean },
        saturday: { open: String, close: String, closed: Boolean },
        sunday: { open: String, close: String, closed: Boolean }
      }
    },
    step4: {
      voiceBotEnabled: Boolean,
      textToSpeech: Boolean,
      speechToText: Boolean,
      voice: String,
      speed: String
    },
    step5: {
      agentName: String,
      chatUrl: String,
      phoneNumber: String,
      dashboardUrl: String,
      status: {
        agent: String,
        training: String,
        integration: String
      }
    }
  },
  settings: {
    agentName: {
      type: String,
      default: 'AI Assistant'
    },
    welcomeMessage: {
      type: String,
      default: 'Hello! How can I help you today?'
    },
    fallbackMessage: {
      type: String,
      default: "I'll connect you with a human representative shortly."
    },
    businessHours: {
      type: String,
      default: 'Monday-Friday: 9:00 AM - 5:00 PM'
    },
    aiUsage: {
      type: Boolean,
      default: true
    },
    gdpr: {
      type: Boolean,
      default: true
    }
  },
  integrations: {
    goHighLevel: {
      connected: { type: Boolean, default: false },
      apiKey: String,
      locationId: String
    },
    openai: {
      connected: { type: Boolean, default: false },
      apiKey: String
    },
    googleAnalytics: {
      connected: { type: Boolean, default: false },
      trackingId: String
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare user password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET || 'your-secret-key',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    }
  );
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

module.exports = mongoose.model('User', userSchema); 