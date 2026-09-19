# Render Deployment & Keep-Alive Guide - DoableForge Backend

This guide outlines how to deploy the DoableForge FastAPI backend to Render with automated sleep prevention, health monitoring, and CORS configuration.

---

## 1. Overview & Architecture

Render's free tier automatically spins down web services after 15 minutes of inactivity. To ensure 100% uptime and instant response times without cold starts:

1. **Keep-Alive Background Worker (`backend/keep_alive.py`)**:
   - Runs asynchronously inside FastAPI's application `lifespan`.
   - Sends automated keep-alive heartbeats every **5–10 seconds** (`KEEP_ALIVE_INTERVAL=10`).
   - Automatically detects Render's public URL via `RENDER_EXTERNAL_URL` (e.g. `https://<app-name>.onrender.com/api/health`) to keep Render's reverse proxy active.
   - Collects real-time metrics: ping count, last status code, database health, and uptime.

2. **Dual Health Check Endpoints**:
   - `/health` (Render's native default health check path).
   - `/api/health` (Internal API endpoint).
   - Supports both `GET` and `HEAD` requests.

---

## 2. Option A: 1-Click Blueprint Deployment (Recommended)

The repository includes a ready-to-use [`render.yaml`](../render.yaml) blueprint.

1. Push your repository to **GitHub** or **GitLab**.
2. Go to the [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** -> **Blueprint**.
4. Connect your `doableforge` repository.
5. Render will automatically detect [`render.yaml`](../render.yaml) and configure:
   - **Service Type**: Web Service (`doableforge-backend`)
   - **Environment**: Python
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
   - **Health Check Path**: `/health`
   - **Auto-Deploy**: Enabled on Git push
6. Click **Apply**.

---

## 3. Option B: Manual Web Service Deployment

If creating the web service manually in the Render dashboard:

1. Click **New +** -> **Web Service**.
2. Select your repository.
3. Configure the following settings:

   > [!IMPORTANT]
   > **Choice of Root Directory on Render**:
   >
   > **Method 1 (Recommended - Leave Root Directory Blank)**:
   > - **Root Directory**: *(leave completely blank / empty)*
   > - **Build Command**: `pip install -r backend/requirements.txt` (or `./build.sh`)
   > - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
   >
   > **Method 2 (If you set Root Directory to `backend`)**:
   > - **Root Directory**: `backend`
   > - **Build Command**: `pip install -r requirements.txt` (or `./build.sh`)
   > - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   >
   > *Note: If you set Root Directory to `backend` and typed `pip install -r backend/requirements.txt`, it will error because it looks for `backend/backend/requirements.txt`!*

   | Setting | Value (Method 1 - Recommended) |
   |---|---|
   | **Name** | `doableforge-backend` |
   | **Region** | Oregon (US West) or closest to your users |
   | **Branch** | `main` |
   | **Root Directory** | *(Leave blank)* |
   | **Runtime** | `Python 3` |
   | **Build Command** | `pip install -r backend/requirements.txt` |
   | **Start Command** | `uvicorn backend.main:app --host 0.0.0.0 --port $PORT` |
   | **Instance Type** | Free |
   | **Health Check Path** | `/health` |

4. Under **Environment Variables**, add:
   ```env
   PYTHON_VERSION=3.11.9
   ENVIRONMENT=production
   ENABLE_KEEP_ALIVE=true
   KEEP_ALIVE_INTERVAL=10
   CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,*
   ```
   *(Optional)* If using Hostinger or Gmail SMTP for contact form emails, add your SMTP variables:
   ```env
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_USER=contact@doableforge.com
   SMTP_PASSWORD=your-email-password
   SMTP_USE_SSL=true
   CONTACT_RECIPIENT_EMAIL=contact@doableforge.com
   ```

5. Click **Create Web Service**.

---

## 4. How the Keep-Alive Loop Works on Render

Once your service is deployed:
1. Render assigns a public URL, e.g. `https://doableforge-backend.onrender.com`.
2. Render injects the environment variable `RENDER_EXTERNAL_URL=https://doableforge-backend.onrender.com`.
3. The `KeepAliveManager` automatically recognizes `RENDER_EXTERNAL_URL` and begins pinging `https://doableforge-backend.onrender.com/api/health` every 10 seconds.
4. Because the HTTP requests route through Render's external reverse proxy, Render registers ongoing traffic and **does not spin down** the free instance.

---

## 5. Verifying Deployment Health

Once deployed, visit or query:
```bash
curl -X GET https://<your-app-name>.onrender.com/health
```

Example JSON response:
```json
{
  "status": "online",
  "health": "healthy",
  "service": "DoableForge Enterprise API",
  "version": "1.0.0",
  "environment": "production",
  "timestamp": "2026-09-19T10:35:00.000000+00:00",
  "uptime_seconds": 128.45,
  "uptime_human": "2m 8s",
  "database": {
    "status": "connected",
    "dialect": "sqlite"
  },
  "keep_alive": {
    "enabled": true,
    "interval_seconds": 10,
    "target_url": "https://<your-app-name>.onrender.com/api/health",
    "ping_count": 12,
    "successful_pings": 12,
    "failed_pings": 0,
    "last_ping_time": "2026-09-19T10:34:58.000000+00:00",
    "last_status_code": 200,
    "last_error": null
  },
  "escrow_vault": "active",
  "protocol": "Mainnet Escrow v2.4",
  "zero_resume_bias": true
}
```

---

## 6. Connecting Your Frontend

When deploying your React / Vite frontend (e.g. to Vercel, Netlify, or Cloudflare Pages):
Set the environment variable in your frontend project:
```env
VITE_API_URL=https://<your-app-name>.onrender.com/api
```
The frontend [`src/services/api.js`](../src/services/api.js) automatically reads this variable to communicate directly with your Render backend.
