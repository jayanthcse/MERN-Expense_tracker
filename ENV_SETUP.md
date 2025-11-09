# 🔐 Environment Variables Quick Reference

## 📋 What You Need Before Starting

1. **MongoDB Atlas Connection String**
   - Format: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority`
   - Get it from: MongoDB Atlas → Database → Connect → Connect your application

2. **JWT Secret Key**
   - A random secure string (minimum 32 characters recommended)
   - Generate at: https://randomkeygen.com/ (use "CodeIgniter Encryption Keys")
   - Example: `a8f5f167f44f4964e6c998dee827110c`

---

## 🔧 Render (Backend) Environment Variables

Copy these to Render Dashboard → Your Service → Environment:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/expense_tracker?retryWrites=true&w=majority
JWT_SECRET=YOUR_RANDOM_SECRET_KEY_HERE
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://YOUR_VERCEL_APP_NAME.vercel.app
```

### ⚠️ Important Notes:
- Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, `YOUR_CLUSTER` with actual MongoDB Atlas values
- Replace `YOUR_RANDOM_SECRET_KEY_HERE` with a strong random string
- `FRONTEND_URL` will be updated after deploying to Vercel (initially you can use a placeholder)

---

## 🎨 Vercel (Frontend) Environment Variables

Copy these to Vercel Dashboard → Your Project → Settings → Environment Variables:

```env
REACT_APP_API_URL=https://YOUR_RENDER_APP_NAME.onrender.com
```

### ⚠️ Important Notes:
- Replace `YOUR_RENDER_APP_NAME` with your actual Render service URL
- Make sure to include `https://` (not `http://`)
- No trailing slash at the end

---

## 🔄 Deployment Order

1. **First**: Setup MongoDB Atlas and get connection string
2. **Second**: Deploy Backend to Render with MongoDB URI and JWT Secret
3. **Third**: Deploy Frontend to Vercel with Backend API URL
4. **Fourth**: Update Render's `FRONTEND_URL` with actual Vercel URL

---

## ✅ Example Configuration (After Deployment)

### Render Backend
```env
MONGODB_URI=mongodb+srv://jayanthcse:MyP@ssw0rd@cluster0.abc123.mongodb.net/expense_tracker?retryWrites=true&w=majority
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://expense-tracker-mern.vercel.app
```

### Vercel Frontend
```env
REACT_APP_API_URL=https://expense-tracker-api.onrender.com
```

---

## 🐛 Common Mistakes to Avoid

❌ **Don't** include quotes around values in Render/Vercel
❌ **Don't** add trailing slashes to URLs
❌ **Don't** use `http://` for production URLs (use `https://`)
❌ **Don't** forget to replace `<password>` in MongoDB connection string
❌ **Don't** share your JWT_SECRET publicly

✅ **Do** use strong, random JWT secrets
✅ **Do** whitelist all IPs (0.0.0.0/0) in MongoDB Atlas for Render
✅ **Do** update FRONTEND_URL after deploying to Vercel
✅ **Do** test the connection after each deployment step

---

## 📞 Need Help?

Check the full deployment guide: `DEPLOYMENT_GUIDE.md`
