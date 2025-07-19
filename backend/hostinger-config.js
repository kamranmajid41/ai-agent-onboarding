// Hostinger-specific configuration
const hostingerConfig = {
  // Database configuration for Hostinger MySQL
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'your_db_user',
    password: process.env.DB_PASSWORD || 'your_db_password',
    database: process.env.DB_NAME || 'your_database_name',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  },

  // File upload configuration for Hostinger
  upload: {
    destination: process.env.UPLOAD_PATH || '/home/username/public_html/uploads',
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']
  },

  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    cors: {
      origin: process.env.FRONTEND_URL || 'https://yourdomain.com',
      credentials: true
    }
  },

  // Security configuration
  security: {
    jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret',
    bcryptRounds: 12,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  },

  // Email configuration (using Hostinger's SMTP)
  email: {
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'your-email@yourdomain.com',
      pass: process.env.SMTP_PASS || 'your-email-password'
    }
  }
};

module.exports = hostingerConfig; 