# Hostinger Migration Guide

## Complete Migration from Vercel/Railway to Hostinger

This guide will help you move your entire application to Hostinger's hosting services.

---

## Step 1: Choose Your Hostinger Plan

### Option A: Shared Web Hosting (Recommended for Start)
- **Plan:** Premium or Business Shared Hosting
- **Cost:** $3-10/month
- **Includes:** 
  - Node.js support
  - MySQL database
  - SSL certificate
  - Email hosting
  - Multiple domains

### Option B: VPS Hosting (For Higher Traffic)
- **Plan:** VPS 1 or VPS 2
- **Cost:** $10-30/month
- **Includes:**
  - Full server control
  - Custom configurations
  - Multiple applications

---

## Step 2: Prepare Your Project

### Backend Preparation
1. **Database Migration:**
   - Export your current database (MongoDB/PostgreSQL)
   - Import to Hostinger's MySQL database
   - Update connection strings

2. **Environment Variables:**
   - Update database connection
   - Update API keys and secrets
   - Update file upload paths

### Frontend Preparation
1. **Build Optimization:**
   - Optimize for shared hosting
   - Update API endpoints
   - Configure static file serving

---

## Step 3: Database Setup

### Option A: Hostinger MySQL (Recommended)
1. **In Hostinger Control Panel:**
   - Go to "Databases" → "MySQL Databases"
   - Create new database
   - Create database user
   - Note: hostname, database name, username, password

2. **Update Backend Configuration:**
   ```javascript
   // Update backend/src/config/database.js
   const dbConfig = {
     host: 'your-hostinger-mysql-host',
     user: 'your-database-user',
     password: 'your-database-password',
     database: 'your-database-name'
   };
   ```

### Option B: External Database (MongoDB Atlas)
- Keep using MongoDB Atlas
- Update connection strings in backend

---

## Step 4: Upload Your Code

### Method A: File Manager (Easier)
1. **Login to Hostinger Control Panel**
2. **Go to File Manager**
3. **Navigate to public_html (for frontend)**
4. **Create subdirectory for backend (e.g., /api)**
5. **Upload your files:**
   - Frontend: Upload to public_html
   - Backend: Upload to public_html/api

### Method B: FTP/SFTP (Recommended)
1. **Get FTP credentials from Hostinger**
2. **Use FileZilla or similar FTP client**
3. **Upload files to appropriate directories**

---

## Step 5: Configure Your Application

### Backend Configuration
1. **Update package.json scripts:**
   ```json
   {
     "scripts": {
       "start": "node src/index.js",
       "build": "npm install"
     }
   }
   ```

2. **Create .htaccess for backend:**
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ /src/index.js [QSA,L]
   ```

3. **Update environment variables:**
   - Database connection
   - API keys
   - File upload paths

### Frontend Configuration
1. **Update API endpoints:**
   ```javascript
   // Update frontend/src/services/authService.js
   const API_BASE_URL = 'https://yourdomain.com/api';
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Upload built files to public_html**

---

## Step 6: Domain Configuration

### Point Domain to Hostinger
1. **In Hostinger Control Panel:**
   - Go to "Domains" → "Manage"
   - Add your domain
   - Update nameservers if needed

2. **DNS Configuration:**
   - A record: @ → your hosting IP
   - CNAME: www → your hosting IP
   - CNAME: api → your hosting IP (for backend)

---

## Step 7: SSL Certificate

1. **In Hostinger Control Panel:**
   - Go to "SSL" → "Manage"
   - Enable SSL for your domain
   - Wait for activation (usually 5-10 minutes)

---

## Step 8: Testing

### Test Your Application
1. **Frontend:** Visit yourdomain.com
2. **Backend:** Test API endpoints
3. **Database:** Verify data connections
4. **File Uploads:** Test file upload functionality

### Common Issues & Solutions

**Issue: Node.js not working**
- Solution: Contact Hostinger support to enable Node.js

**Issue: Database connection failed**
- Solution: Check database credentials and hostname

**Issue: File uploads not working**
- Solution: Check file permissions and upload directory

**Issue: API endpoints returning 404**
- Solution: Verify .htaccess configuration

---

## Step 9: Performance Optimization

### Backend Optimization
1. **Enable compression**
2. **Set up caching headers**
3. **Optimize database queries**

### Frontend Optimization
1. **Enable gzip compression**
2. **Optimize images**
3. **Minify CSS/JS**

---

## Step 10: Monitoring & Maintenance

### Set Up Monitoring
1. **Hostinger's built-in monitoring**
2. **Error logging**
3. **Performance tracking**

### Regular Maintenance
1. **Database backups**
2. **Security updates**
3. **Performance monitoring**

---

## Migration Checklist

- [ ] Choose Hostinger plan
- [ ] Export current database
- [ ] Prepare backend for Hostinger
- [ ] Prepare frontend for Hostinger
- [ ] Set up Hostinger hosting
- [ ] Create database on Hostinger
- [ ] Upload backend code
- [ ] Upload frontend code
- [ ] Configure .htaccess files
- [ ] Update environment variables
- [ ] Update API endpoints
- [ ] Point domain to Hostinger
- [ ] Enable SSL certificate
- [ ] Test all functionality
- [ ] Optimize performance
- [ ] Set up monitoring

---

## Support Resources

- **Hostinger Support:** 24/7 live chat
- **Documentation:** Hostinger knowledge base
- **Community:** Hostinger forums

---

## Cost Comparison

| Service | Current Cost | Hostinger Cost | Savings |
|---------|-------------|----------------|---------|
| Vercel | $20/month | $0 | $20/month |
| Railway | $5/month | $0 | $5/month |
| Database | $15/month | $0 | $15/month |
| **Total** | **$40/month** | **$5-10/month** | **$30-35/month** |

---

**Need help with any specific step? Let me know and I'll provide detailed instructions!** 