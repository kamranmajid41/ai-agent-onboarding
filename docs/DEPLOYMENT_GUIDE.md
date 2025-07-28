# Deployment Guide - AI Agent Self-Onboarding Platform

## Overview

This guide provides comprehensive instructions for deploying the AI Agent Self-Onboarding Platform across different hosting environments. The platform consists of a Next.js frontend and Node.js backend with MongoDB database and AWS S3 file storage.

## Prerequisites

### Required Services
- **Database**: MongoDB Atlas or self-hosted MongoDB
- **File Storage**: AWS S3 bucket
- **AI Services**: OpenAI API account
- **CRM Integration**: GoHighLevel API (optional)

### Environment Variables
All deployment environments require the following environment variables:

**Backend Variables**
```bash
NODE_ENV=production
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=30d
OPENAI_API_KEY=your_openai_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket_name
CLIENT_URL=your_frontend_url
```

**Frontend Variables**
```bash
NEXT_PUBLIC_API_BASE_URL=your_backend_api_url
```

## Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect GitHub repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `.next`
   - Configure environment variables in Vercel dashboard

3. **Vercel Configuration**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/next"
       }
     ],
     "env": {
       "NEXT_PUBLIC_API_BASE_URL": "your_backend_url"
     }
   }
   ```

#### Backend Deployment (Railway)

1. **Prepare Backend**
   ```bash
   cd backend
   npm install --production
   ```

2. **Deploy to Railway**
   - Connect GitHub repository to Railway
   - Set start command: `npm start`
   - Configure environment variables in Railway dashboard

3. **Railway Configuration**
   ```json
   {
     "name": "ai-agent-backend",
     "scripts": {
       "start": "node src/index.js"
     },
     "engines": {
       "node": "16.x"
     }
   }
   ```

### Option 2: Hostinger Shared Hosting

#### Database Setup
1. **Create MySQL Database**
   - Access Hostinger Control Panel
   - Navigate to Databases > MySQL Databases
   - Create new database and user
   - Note connection details

2. **Update Database Configuration**
   ```javascript
   // backend/src/config/database.js
   const dbConfig = {
     host: 'your-hostinger-mysql-host',
     user: 'your-database-user',
     password: 'your-database-password',
     database: 'your-database-name'
   };
   ```

#### File Upload
1. **Upload Frontend Files**
   - Access File Manager in Hostinger Control Panel
   - Navigate to public_html directory
   - Upload frontend build files

2. **Upload Backend Files**
   - Create api subdirectory in public_html
   - Upload backend files to public_html/api

3. **Configure .htaccess**
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^api/(.*)$ api/index.php [QSA,L]
   ```

### Option 3: AWS EC2

#### Server Setup
1. **Launch EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - Configure security groups for ports 22, 80, 443
   - Generate and download key pair

2. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx mongodb
   sudo npm install -g pm2
   ```

3. **Deploy Application**
   ```bash
   # Clone repository
   git clone your-repository-url
   cd ai-agent-onboarding

   # Setup backend
   cd backend
   npm install --production
   cp .env.example .env
   # Configure environment variables
   pm2 start src/index.js --name "ai-agent-backend"

   # Setup frontend
   cd ../frontend
   npm install
   npm run build
   sudo cp -r .next /var/www/html/
   ```

4. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           root /var/www/html;
           try_files $uri $uri/ /index.html;
       }

       location /api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Database Migration

### MongoDB Atlas Setup
1. **Create Cluster**
   - Sign up for MongoDB Atlas
   - Create new cluster
   - Configure network access (0.0.0.0/0 for development)
   - Create database user

2. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database
   ```

3. **Update Environment Variables**
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

### Local MongoDB Setup
1. **Install MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo apt install mongodb

   # macOS
   brew install mongodb-community
   ```

2. **Start MongoDB Service**
   ```bash
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

3. **Create Database**
   ```bash
   mongo
   use ai-agent-platform
   db.createUser({
     user: "admin",
     pwd: "password",
     roles: ["readWrite"]
   })
   ```

## File Storage Setup

### AWS S3 Configuration
1. **Create S3 Bucket**
   - Sign in to AWS Console
   - Navigate to S3 service
   - Create new bucket with unique name
   - Configure bucket permissions

2. **Create IAM User**
   - Navigate to IAM service
   - Create new user with programmatic access
   - Attach S3FullAccess policy
   - Generate access keys

3. **Configure CORS**
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "POST", "PUT", "DELETE"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

## SSL Certificate Setup

### Let's Encrypt (Free)
1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain Certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Auto-renewal**
   ```bash
   sudo crontab -e
   # Add line: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

### Paid SSL Certificate
1. **Purchase Certificate**
   - Buy SSL certificate from provider
   - Download certificate files

2. **Install Certificate**
   ```bash
   sudo cp certificate.crt /etc/ssl/certs/
   sudo cp private.key /etc/ssl/private/
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 443 ssl;
       ssl_certificate /etc/ssl/certs/certificate.crt;
       ssl_certificate_key /etc/ssl/private/private.key;
       # ... rest of configuration
   }
   ```

## Monitoring and Maintenance

### Application Monitoring
1. **PM2 Monitoring**
   ```bash
   pm2 monit
   pm2 logs
   pm2 status
   ```

2. **Nginx Monitoring**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **Database Monitoring**
   ```bash
   # MongoDB
   mongo --eval "db.stats()"
   
   # MySQL
   mysql -u root -p -e "SHOW STATUS;"
   ```

### Backup Strategy
1. **Database Backup**
   ```bash
   # MongoDB
   mongodump --uri="mongodb://localhost:27017/database" --out=/backup

   # MySQL
   mysqldump -u username -p database > backup.sql
   ```

2. **File Backup**
   ```bash
   # S3 backup
   aws s3 sync s3://your-bucket /backup/s3
   ```

3. **Automated Backups**
   ```bash
   # Add to crontab
   0 2 * * * /path/to/backup-script.sh
   ```

## Troubleshooting

### Common Issues

#### Frontend Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### Backend Connection Issues
```bash
# Check if port is in use
netstat -tulpn | grep :3001

# Kill process if needed
kill -9 process_id
```

#### Database Connection Issues
```bash
# Test MongoDB connection
mongo "mongodb://localhost:27017/database"

# Test MySQL connection
mysql -u username -p -h hostname database
```

#### File Upload Issues
```bash
# Check S3 permissions
aws s3 ls s3://your-bucket

# Test file upload
aws s3 cp test.txt s3://your-bucket/
```

### Performance Optimization
1. **Frontend Optimization**
   - Enable gzip compression
   - Implement CDN for static assets
   - Optimize images and fonts

2. **Backend Optimization**
   - Implement caching (Redis)
   - Database query optimization
   - Load balancing for high traffic

3. **Database Optimization**
   - Create proper indexes
   - Regular maintenance
   - Monitor slow queries

## Security Considerations

### Environment Security
1. **Secure Environment Variables**
   - Never commit .env files
   - Use strong, unique secrets
   - Rotate secrets regularly

2. **Network Security**
   - Configure firewalls
   - Use HTTPS only
   - Implement rate limiting

3. **Application Security**
   - Regular dependency updates
   - Input validation
   - SQL injection prevention

### Access Control
1. **Database Access**
   - Use least privilege principle
   - Regular access reviews
   - Monitor access logs

2. **File Storage Access**
   - Implement proper IAM policies
   - Use pre-signed URLs
   - Monitor access patterns

## Support and Maintenance

### Regular Maintenance Tasks
1. **Weekly**
   - Check application logs
   - Monitor resource usage
   - Update dependencies

2. **Monthly**
   - Security updates
   - Performance review
   - Backup verification

3. **Quarterly**
   - Full security audit
   - Performance optimization
   - Documentation updates

### Support Resources
- **Documentation**: Technical documentation in /docs
- **Issues**: GitHub issue tracker
- **Monitoring**: Application monitoring tools
- **Backup**: Automated backup systems 