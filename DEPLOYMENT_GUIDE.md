# Backend Deployment Guide

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

1. **Sign up** at [railway.app](https://railway.app)
2. **Connect your GitHub repo** or deploy from local files
3. **Set environment variables** in Railway dashboard:
   ```
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   OPENAI_API_KEY=sk-your-openai-api-key
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=your-s3-bucket-name
   GOHIGHLEVEL_API_KEY=your-gohighlevel-api-key
   ```
4. **Deploy** - Railway will automatically detect Node.js and run `npm start`

### Option 2: Render

1. **Sign up** at [render.com](https://render.com)
2. **Create a new Web Service**
3. **Connect your GitHub repo**
4. **Configure**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. **Set environment variables** (same as Railway)
6. **Deploy**

### Option 3: Heroku

1. **Install Heroku CLI** and sign up
2. **Login**: `heroku login`
3. **Create app**: `heroku create your-app-name`
4. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-connection-string
   heroku config:set JWT_SECRET=your-secret
   # ... add all other variables
   ```
5. **Deploy**: `git push heroku main`

## Environment Variables Setup

### Required Variables
```bash
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend-domain.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-agent-onboarding
JWT_SECRET=your-super-secret-jwt-key-here
OPENAI_API_KEY=sk-your-openai-api-key
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
GOHIGHLEVEL_API_KEY=your-gohighlevel-api-key
```

### Optional Variables
```bash
ENCRYPTION_KEY=your-32-character-encryption-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10485760
MAX_FILES_PER_REQUEST=5
LOG_LEVEL=info
```

## Database Setup

### MongoDB Atlas (Recommended)
1. **Create account** at [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Create cluster** (free tier available)
3. **Get connection string** and add to environment variables
4. **Whitelist IP addresses** (0.0.0.0/0 for all)

## Frontend Configuration

After deploying backend, update your frontend environment variables:

```bash
# In your Vercel environment variables
NEXT_PUBLIC_API_URL=https://your-backend-domain.railway.app
# or
NEXT_PUBLIC_API_URL=https://your-backend-domain.render.com
# or
NEXT_PUBLIC_API_URL=https://your-backend-domain.herokuapp.com
```

## Testing Deployment

1. **Health check**: Visit `https://your-backend-url/health`
2. **Test API endpoints**: Use Postman or curl
3. **Check logs**: Monitor deployment logs for errors

## Troubleshooting

### Common Issues
- **CORS errors**: Ensure `FRONTEND_URL` is set correctly
- **Database connection**: Check MongoDB connection string and IP whitelist
- **Environment variables**: Verify all required variables are set
- **Port issues**: Most platforms set `PORT` automatically

### Logs
- **Railway**: View logs in dashboard
- **Render**: Check deployment logs
- **Heroku**: `heroku logs --tail`

## Cost Estimates

- **Railway**: $5-20/month (no free tier)
- **Render**: Free tier available, $7-25/month for paid plans
- **Heroku**: $7-25/month (no free tier)
- **DigitalOcean**: $5-12/month

## Security Notes

- Use strong, unique secrets for `JWT_SECRET`
- Never commit `.env` files to Git
- Use environment variables for all sensitive data
- Enable HTTPS (automatic on most platforms)
- Set up proper CORS configuration 