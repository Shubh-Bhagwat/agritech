# 🚀 Vercel Deployment Guide — Agritech Platform

Your Agritech platform is now **100% configured for Vercel deployment**. It supports both:
1. **Fullstack Deployment (Recommended)**: Both Frontend and Express Serverless API deployed together in one Vercel project with a single URL.
2. **Independent Deployments**: Frontend and Backend deployed as separate Vercel projects if preferred.

---

## ⚡ Option 1: Fullstack 1-Click Deployment (Recommended)

In this approach, Vercel serves the **Vite Glassmorphism Frontend** as static assets and runs the **Express Backend** as a Serverless Function under `/api/*`.

### Step 1: Push Project to GitHub / GitLab / Bitbucket
Initialize Git in the project root if you haven't already:
```bash
git init
git add .
git commit -m "Configure Agritech for Vercel deployment"
git remote add origin https://github.com/Shubh-Bhagwat/agritech.git
git push -u origin main
```

### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub repository and click **"Import"**.
4. In **Project Settings**:
   - **Framework Preset**: Leave as *Other* (or *Vite*).
   - **Root Directory**: Leave as `./` (Root).
   - The build settings are automatically read from `vercel.json`:
     - **Build Command**: `cd frontend && npm install && npm run build`
     - **Output Directory**: `frontend/dist`

### Step 3: Add Environment Variables in Vercel
Under the **Environment Variables** section in the Vercel import page, add:

| Key | Example Value | Description |
|---|---|---|
| `MONGO_URI` | `mongodb+srv://<user>:<password>@cluster0.mongodb.net/agriculture_db?retryWrites=true&w=majority` | Your live MongoDB Atlas connection string |
| `JWT_SECRET` | `your_super_strong_random_secret_key_2024` | Secret key used for signing JWT tokens |
| `NODE_ENV` | `production` | Production environment flag |

> ⚠️ **Important (MongoDB Atlas Access)**: Make sure in MongoDB Atlas under **Network Access**, IP address `0.0.0.0/0` (Allow Access from Anywhere) is enabled so Vercel's dynamic serverless IP addresses can connect.

### Step 4: Click "Deploy"
Vercel will build the frontend bundle and package the serverless backend. Once finished, you will receive a production URL such as:
`https://agritech-platform.vercel.app`

- Frontend is accessible at: `https://agritech-platform.vercel.app`
- Backend API is accessible at: `https://agritech-platform.vercel.app/api`

---

## 🛠️ Option 2: Separate Deployments (Optional)

If you prefer two separate Vercel URLs:

### Deploying the Backend Only:
1. Import the same repository to Vercel.
2. Set **Root Directory** to `backend`.
3. Add `MONGO_URI`, `JWT_SECRET`, and `NODE_ENV=production` in Environment Variables.
4. Deploy. You'll receive a URL like: `https://agritech-backend.vercel.app`.

### Deploying the Frontend Only:
1. Import the same repository to Vercel.
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable:
   - `VITE_API_URL`: `https://agritech-backend.vercel.app/api`
4. Deploy. You'll receive a URL like: `https://agritech-frontend.vercel.app`.

---

## 🔍 How the Vercel Setup Works Internally

- **`vercel.json`**:
  - Rewrites all `/api/*` requests to the Serverless Function `api/index.js`.
  - Rewrites all non-API paths to `/index.html` for single-page client routing.
- **`api/index.js`**:
  - Exports the Express application directly as a Vercel serverless handler.
- **`backend/db/config.js`**:
  - Caches the MongoDB connection (`mongoose.connection.readyState >= 1`) across warm serverless function invocations to avoid reconnection overhead.
- **`backend/index.js`**:
  - Exports `app` for serverless runtimes and ensures connection middleware runs before requests.
