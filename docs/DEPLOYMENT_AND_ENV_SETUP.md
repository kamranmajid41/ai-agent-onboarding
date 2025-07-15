# Deployment & Environment Setup Guide

## 0. Cloning the Repository

Before you can deploy or run the project, you need to make a copy ("clone") of the code from GitHub to your own computer or cloud platform. This is called "cloning a repository." Here are several ways to do this, with detailed instructions for beginners:

### Option 1: Using the GitHub Website (Easiest for Most Users)
1. **Go to the project repository:**
   - Open your web browser and go to [https://github.com/kamranmajid41/ai-agent-onboarding](https://github.com/kamranmajid41/ai-agent-onboarding)
2. **Download the code as a ZIP file:**
   - Click the green **"Code"** button near the top right.
   - In the menu that appears, click **"Download ZIP"**.
   - ![Download ZIP screenshot](https://docs.github.com/assets/images/help/repository/code-button.png)
3. **Unzip the file:**
   - Find the downloaded ZIP file (usually in your Downloads folder).
   - Double-click the file to unzip/extract it. This will create a folder called `ai-agent-onboarding`.
   - Move this folder to a location you can easily find, like your Desktop or Documents.
4. **You now have the project files on your computer!**

**Troubleshooting:**
- If you can't find the ZIP file, check your browser's Downloads section.
- If you can't unzip, try right-clicking and selecting "Extract All" (Windows) or use a free tool like 7-Zip.

### Option 2: Using GitHub Desktop (No command line needed)
1. **Install GitHub Desktop:**
   - Download from [https://desktop.github.com/](https://desktop.github.com/)
   - Install and open the app.
2. **Sign in to GitHub:**
   - Use your GitHub account (create one if you don't have it).
3. **Clone the repository:**
   - Click **"File" > "Clone repository..."**
   - In the window, click the **URL** tab.
   - Paste this URL: `https://github.com/kamranmajid41/ai-agent-onboarding.git`
   - Choose a local path (where you want the folder to be saved, e.g., Desktop).
   - Click **"Clone"**.
4. **You now have the project files on your computer!**

**Troubleshooting:**
- If you get an error, make sure you are connected to the internet and signed in to GitHub.
- If you can't find the folder, check the path you selected during cloning.

### Option 3: Using the Command Line (for Windows/Mac/Linux)
1. **Install Git:**
   - Download from [https://git-scm.com/downloads](https://git-scm.com/downloads) and follow the instructions for your operating system.
2. **Open your terminal or command prompt:**
   - On Windows: Press `Win + R`, type `cmd`, and press Enter.
   - On Mac: Open `Terminal` from Applications > Utilities.
   - On Linux: Open your terminal app.
3. **Clone the repository:**
   - Type the following command and press Enter:
     ```
     git clone https://github.com/kamranmajid41/ai-agent-onboarding.git
     ```
   - This will create a folder called `ai-agent-onboarding` in your current directory.
4. **Go into the project folder:**
   - Type:
     ```
     cd ai-agent-onboarding
     ```
5. **You now have the project files on your computer!**

**Troubleshooting:**
- If you get "git: command not found", Git is not installed or not added to your PATH.
- If you get a permissions error, try running your terminal as administrator.

---

## 1. Overview

- **Frontend**: The part users see (website/app), built with Next.js. Deployed to [Vercel](https://vercel.com/).
- **Backend**: The server/API that handles data, authentication, and AI. Built with Node.js/Express. Deployed to [Railway](https://railway.app/).
- **Environment Variables**: Secret keys and settings needed for the app to work (e.g., API keys, database URLs).

---

## 2. Deploying the Frontend to Vercel

### What is Vercel?
Vercel is a platform that hosts websites and web apps. It automatically builds and deploys your frontend code from GitHub.

### Step-by-Step Instructions

1. **Create a Vercel account:**
   - Go to [https://vercel.com/](https://vercel.com/) and sign up (you can use your GitHub account).
2. **Import your project:**
   - Click **"New Project"**.
   - Select your GitHub account and find the `ai-agent-onboarding` repo.
   - Click **"Import"**.
3. **Set environment variables:**
   - In the setup, Vercel will ask for environment variables. Click **"Add"** and enter each variable (see section 4 below).
   - Example:
     - Name: `NEXT_PUBLIC_API_URL`
     - Value: `https://<your-railway-backend-domain>/api`
   - You can always add/edit these later in **Settings > Environment Variables**.
4. **Deploy:**
   - Click **"Deploy"**. Vercel will build and deploy your app.
   - After a few minutes, your site will be live at a URL like `https://your-project-name.vercel.app`.
5. **Check your site:**
   - Visit the URL Vercel gives you. If you see your app, it worked!

**Troubleshooting:**
- If you see a build error, check that your environment variables are correct.
- If the site is blank, make sure the backend is running and accessible.

---

## 3. Deploying the Backend to Railway

### What is Railway?
Railway is a platform for running backend servers and databases in the cloud. It connects to GitHub and auto-deploys your backend code.

### Step-by-Step Instructions

1. **Create a Railway account:**
   - Go to [https://railway.app/](https://railway.app/) and sign up (you can use your GitHub account).
2. **Create a new project:**
   - Click **"New Project"**.
   - Choose **"Deploy from GitHub repo"**.
   - Select your `ai-agent-onboarding` repo.
3. **Set up environment variables:**
   - Go to your Railway project dashboard.
   - Click **"Variables"** (or **"Settings > Variables"**).
   - Add each variable listed in section 4 below. Click **"New Variable"** for each one.
   - Example:
     - Key: `MONGODB_URI`
     - Value: (your MongoDB connection string)
4. **Set up MongoDB:**
   - Click **"Add Plugin"** and choose **MongoDB** (or use your own MongoDB Atlas cluster).
   - Copy the connection string and set it as the value for `MONGODB_URI`.
5. **Deploy:**
   - Railway will automatically build and deploy your backend when you push to GitHub.
   - Your backend will be live at a URL like `https://your-backend-name.up.railway.app`.
6. **Check your backend:**
   - Visit `https://your-backend-name.up.railway.app/health` to see if it’s running (should say `status: OK`).

**Troubleshooting:**
- If you see a database error, check your `MONGODB_URI` value.
- If the backend won’t start, check all environment variables are set and correct.

---

## 4. Required Environment Variables

### What are Environment Variables?
Environment variables are secret settings (like passwords or API keys) that your app needs to work. Never share these publicly!

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

### What does this mean?
You need to tell Vercel and Railway about your secret keys and settings so your app can connect to databases and APIs. This is done in their web dashboards.

### Vercel

- Go to your project in Vercel.
- Click **Settings > Environment Variables**.
- For each variable, click **Add** and enter the name and value.
- Make sure to select the correct environment (Production/Preview/Development).
- Click **Save** after adding each variable.

### Railway

- Go to your project in Railway.
- Click **Variables** (or **Settings > Variables**).
- For each variable, click **New Variable** and enter the key and value.
- Click **Save** after adding each variable.

**Troubleshooting:**
- If your app can’t connect to a service, double-check the variable names and values.
- If you change a variable, redeploy your project.

---

## 6. Getting API Keys

- **OpenAI**: [OpenAI API Keys](https://platform.openai.com/api-keys) — Click "Create new secret key" and copy it.
- **AWS S3**: [AWS IAM Console](https://console.aws.amazon.com/iam/) — Create a new user, attach S3 policy, and generate keys.
- **GoHighLevel**: Log in to GoHighLevel → Settings → API → Copy API Key and Location ID.
- **MongoDB**: Use Railway’s MongoDB plugin or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — Create a new cluster and get the connection string.

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