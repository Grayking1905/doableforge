# Vercel Deployment Guide - DoableForge Frontend

This guide outlines how to deploy the DoableForge React + Vite frontend to **Vercel** with full connectivity to your deployed Render backend.

---

## 1. Prerequisites

1. **Your Deployed Render Backend URL**:
   - You need your Render backend URL, for example:
     `https://doableforge-backend.onrender.com`
   - Your API endpoint will be:
     `https://doableforge-backend.onrender.com/api`

2. **GitHub Repository**:
   - Your repository [`Grayking1905/doableforge`](https://github.com/Grayking1905/doableforge) has all code pushed and ready.

---

## 2. Option A: 1-Click Dashboard Deployment (Recommended)

### Step 1: Sign in to Vercel
1. Go to [vercel.com](https://vercel.com/) and click **Log In** or **Sign Up**.
2. Choose **Continue with GitHub** (so Vercel can access your repositories).

### Step 2: Import Your Repository
1. On the Vercel Dashboard, click **Add New...** -> **Project**.
2. Find `Grayking1905/doableforge` in your GitHub repository list.
3. Click **Import**.

### Step 3: Configure Project Settings
Vercel automatically detects the [`vercel.json`](../vercel.json) configuration:
- **Framework Preset**: `Vite`
- **Root Directory**: `./` *(leave default)*
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 4: Add Environment Variable (Crucial)
Under the **Environment Variables** section, add your backend API URL:
| Key | Value |
|---|---|
| `VITE_API_URL` | `https://<your-render-app>.onrender.com/api` |

*(Replace `<your-render-app>` with your actual Render service name!)*

> [!NOTE]
> Make sure the value ends with `/api`, e.g.:
> `https://doableforge-backend.onrender.com/api`

### Step 5: Click "Deploy"
1. Click the blue **Deploy** button.
2. Vercel will run `npm install`, compile the Vite production bundle, and generate a global edge URL (e.g. `https://doableforge.vercel.app`).
3. Your deployment will be live in ~30 seconds! 🎉

---

## 3. Option B: CLI Deployment (Terminal)

If you prefer deploying directly from your terminal using `npx`:

```bash
# 1. Login to Vercel
npx vercel login

# 2. Link and deploy preview
npx vercel

# 3. Add the backend API environment variable
npx vercel env add VITE_API_URL production

# When prompted for the value, enter:
# https://<your-render-app>.onrender.com/api

# 4. Deploy directly to production
npx vercel --prod
```

---

## 4. Features Enabled by `vercel.json`

The included [`vercel.json`](../vercel.json) file automatically configures:
1. **SPA Client-Side Routing**:
   Rewrites all incoming paths to `/index.html` so direct link sharing and browser refreshes never return 404s.
2. **Edge Asset Caching**:
   Sets immutable 1-year cache headers (`Cache-Control: public, max-age=31536000, immutable`) on all compiled JavaScript, CSS, and 3D canvas assets.
3. **Optimized Compression**:
   Vercel automatically serves Brotli/Gzip compression on all static assets.

---

## 5. Post-Deployment Verification Checklist

Once deployed:
1. **Open your Vercel URL** (e.g. `https://doableforge.vercel.app`).
2. **Check Projects Grid**:
   Confirm enterprise projects (e.g. *Offline-First Enterprise Mobile App*, *Distributed Real-time Stream*, etc.) load live from your Render backend database.
3. **Test Contact Form**:
   Submit an advisory or specialist application inquiry — confirm it dispatches via SMTP and receives a receipt token (`DF-CLT-...`).
4. **Inspect Network Tab**:
   In Browser DevTools (F12) -> **Network**, verify API calls are routed to `https://<your-render-app>.onrender.com/api/...` with HTTP 200 responses.
