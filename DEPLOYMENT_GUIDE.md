# 🚀 Deployment Guide - MERN Expense Tracker

## 📋 Prerequisites
- GitHub account
- Render account (for backend)
- Vercel account (for frontend)
- MongoDB Atlas account (for database)

---

## 🗄️ Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier is fine)
3. Create a database user:
   - Go to **Database Access** → **Add New Database User**
   - Choose **Password** authentication
   - Save username and password
4. Whitelist all IPs:
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (0.0.0.0/0)
5. Get your connection string:
   - Go to **Database** → **Connect** → **Connect your application**
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority`

---

## 🔧 Step 2: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository: `jayanthcse/MERN-Expense_tracker`
4. Configure the service:
   - **Name**: `expense-tracker-api` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `Backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables (click **Advanced** → **Add Environment Variable**):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random_and_secure
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-app-name.vercel.app
   ```
   
   **Important Notes:**
   - Replace `MONGODB_URI` with your actual MongoDB Atlas connection string
   - Generate a strong random string for `JWT_SECRET` (you can use: https://randomkeygen.com/)
   - `FRONTEND_URL` will be updated after deploying frontend (Step 3)

6. Click **Create Web Service**
7. Wait for deployment to complete (5-10 minutes)
8. Copy your backend URL (e.g., `https://expense-tracker-api.onrender.com`)

---

## 🎨 Step 3: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository: `jayanthcse/MERN-Expense_tracker`
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `build` (should be auto-detected)

5. Add Environment Variables:
   ```
   REACT_APP_API_URL=https://expense-tracker-api.onrender.com
   ```
   - Replace with your actual Render backend URL from Step 2

6. Click **Deploy**
7. Wait for deployment to complete (2-5 minutes)
8. Copy your frontend URL (e.g., `https://expense-tracker-mern.vercel.app`)

---

## 🔄 Step 4: Update Backend CORS Configuration

1. Go back to your Render dashboard
2. Open your backend service
3. Go to **Environment** tab
4. Update the `FRONTEND_URL` variable with your actual Vercel URL:
   ```
   FRONTEND_URL=https://expense-tracker-mern.vercel.app
   ```
5. Click **Save Changes**
6. Render will automatically redeploy with the new configuration

---

## ✅ Step 5: Test Your Deployment

1. Visit your Vercel frontend URL
2. Try to register a new account
3. Login with your credentials
4. Add some transactions
5. Check if data persists after refresh

---

## 🔐 Environment Variables Summary

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random_and_secure
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-app-name.vercel.app
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://expense-tracker-api.onrender.com
```

---

## 🐛 Troubleshooting

### Backend Issues
- **503 Service Unavailable**: Render free tier spins down after inactivity. First request may take 30-60 seconds.
- **Database Connection Error**: Check MongoDB Atlas connection string and ensure IP whitelist includes 0.0.0.0/0
- **CORS Error**: Ensure `FRONTEND_URL` in Render matches your Vercel URL exactly (including https://)

### Frontend Issues
- **API Connection Failed**: Check if `REACT_APP_API_URL` is set correctly in Vercel
- **Login Not Working**: Check browser console for errors, verify backend is running

### General Tips
- Check Render logs: Dashboard → Your Service → Logs
- Check Vercel logs: Dashboard → Your Project → Deployments → Click on deployment → View Function Logs
- Ensure all environment variables are set correctly (no trailing spaces)

---

## 🔄 Redeploying After Changes

### Backend Changes
1. Push changes to GitHub
2. Render will automatically redeploy

### Frontend Changes
1. Push changes to GitHub
2. Vercel will automatically redeploy

### Manual Redeploy
- **Render**: Dashboard → Your Service → Manual Deploy → Deploy latest commit
- **Vercel**: Dashboard → Your Project → Deployments → Redeploy

---

## 📝 Notes

- **Free Tier Limitations**:
  - Render: Service spins down after 15 minutes of inactivity
  - MongoDB Atlas: 512MB storage limit
  - Vercel: 100GB bandwidth per month

- **Custom Domain** (Optional):
  - Both Render and Vercel support custom domains
  - Configure in respective dashboards under Settings → Domains

---

## 🎉 Congratulations!

Your MERN Expense Tracker is now live and accessible from anywhere! 🚀

**Your URLs:**
- Frontend: `https://your-app-name.vercel.app`
- Backend API: `https://expense-tracker-api.onrender.com`
- GitHub Repo: `https://github.com/jayanthcse/MERN-Expense_tracker`
