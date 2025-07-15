# Deployment & Environment Setup Guide

## 1. Overview

- **Frontend**: Next.js app, typically deployed to [Vercel](https://vercel.com/).
- **Backend**: Node.js/Express API, typically deployed to [Railway](https://railway.app/).
- **Environment Variables**: Both frontend and backend require API keys and secrets for third-party services (OpenAI, AWS S3, GoHighLevel, MongoDB, etc.).

---

## 2. Deploying the Frontend to Vercel

### Steps

1. **Connect your GitHub repository to Vercel**:
   - Go to [Vercel](https://vercel.com/) and sign in.
   - Click **"New Project"** and import your GitHub repo.

2. **Configure Environment Variables**:
   - In your Vercel project dashboard, go to **Settings > Environment Variables**.
   - Add the following variables (see section 4 for details):

     ```
     NEXT_PUBLIC_API_URL=https://<your-railway-backend-domain>/api
     ```

   - Add any other frontend-specific variables as needed.

3. **Deploy**:
   - Click **Deploy**. Vercel will build and deploy your Next.js app.
   - Your site will be live at `https://<your-vercel-project>.vercel.app`.

---

## 3. Deploying the Backend to Railway

### Steps

1. **Create a new project**:
   - Go to [Railway](https://railway.app/) and sign in.
   - Click **"New Project"** and select **Deploy from GitHub repo**.

2. **Configure Environment Variables**:
   - In your Railway project dashboard, go to **Variables**.
   - Add all required backend environment variables (see section 4).

3. **MongoDB**:
   - Add a **MongoDB plugin** in Railway or use your own MongoDB Atlas cluster.
   - Set the `MONGODB_URI` variable to the connection string.

4. **Deploy**:
   - Railway will auto-deploy on push to your main branch.
   - Your backend will be live at `https://<your-railway-app>.up.railway.app`.

---

## 4. Required Environment Variables

### Backend (`/backend`)

Set these in Railway:

| Variable                  | Description/How to Get It                                                                 |
|---------------------------|------------------------------------------------------------------------------------------|
| `MONGODB_URI`             | MongoDB connection string (from Railway plugin or MongoDB Atlas)                         |
| `OPENAI_API_KEY`          | [Get from OpenAI](https://platform.openai.com/api-keys)                                 |
| `AWS_ACCESS_KEY_ID`       | [Get from AWS IAM](https://console.aws.amazon.com/iam/)                                 |
| `AWS_SECRET_ACCESS_KEY`   | [Get from AWS IAM](https://console.aws.amazon.com/iam/)                                 |
| `AWS_REGION`              | Your S3 bucket region (e.g., `us-east-1`)                                               |
| `AWS_S3_BUCKET`           | Your S3 bucket name                                                                     |
| `JWT_SECRET`              | Any random string (used for JWT signing)                                                |
| `COOKIE_EXPIRE`           | (Optional) Days until cookie expires (e.g., `30`)                                       |
| `NODE_ENV`                | `production` or `development`                                                           |
| `SMTP_HOST`               | (If using email) SMTP server host                                                       |
| `SMTP_PORT`               | (If using email) SMTP server port                                                       |
| `SMTP_USER`               | (If using email) SMTP username                                                          |
| `SMTP_PASS`               | (If using email) SMTP password                                                          |
| `FROM_NAME`               | (If using email) Name for outgoing emails                                               |
| `FROM_EMAIL`              | (If using email) Email address for outgoing emails                                      |
| `ADMIN_SETUP_KEY`         | (Optional) Secret key for admin setup route                                             |

**How to get these:**
- **OpenAI**: Go to [OpenAI API Keys](https://platform.openai.com/api-keys), create a key, and copy it.
- **AWS**: Go to [AWS IAM](https://console.aws.amazon.com/iam/), create a user with S3 access, and generate keys.
- **MongoDB**: Use Railway’s MongoDB plugin or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **GoHighLevel**: Get your API key and Location ID from your GoHighLevel dashboard (Settings > API).

### Frontend (`/frontend`)

Set these in Vercel:

| Variable                | Description/How to Get It                                  |
|-------------------------|-----------------------------------------------------------|
| `NEXT_PUBLIC_API_URL`   | URL of your backend API (e.g., `https://...railway.app/api`) |

---

## 5. Adding Environment Variables

### Vercel

- Go to your project in Vercel.
- Click **Settings > Environment Variables**.
- Add each variable, set the value, and select the environment (Production/Preview/Development).

### Railway

- Go to your project in Railway.
- Click **Variables**.
- Add each variable and value.

---

## 6. Getting API Keys

- **OpenAI**: [OpenAI API Keys](https://platform.openai.com/api-keys)
- **AWS S3**: [AWS IAM Console](https://console.aws.amazon.com/iam/) → Create user → Attach S3 policy → Generate keys.
- **GoHighLevel**: Log in to GoHighLevel → Settings → API → Copy API Key and Location ID.
- **MongoDB**: Use Railway’s MongoDB plugin or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

---

## 7. Example `.env` Files

### Backend (`/backend/.env`)

```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

### Frontend (`/frontend/.env.local`)

```
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app/api
```

---

**Tip:** Never commit your `.env` files to GitHub. Always use the deployment platform’s environment variable UI.

---

_Last updated: PHASE 3 completion_ 