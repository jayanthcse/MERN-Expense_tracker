# 🚀 Quick Setup Guide

## Step-by-Step Setup Instructions

### 1️⃣ Install Dependencies

#### Backend
```bash
cd c:\Games\Projects\Expense-Tracker-MERN\Backend
npm install
```

#### Frontend
```bash
cd c:\Games\Projects\Expense-Tracker-MERN\Frontend
npm install
```

### 2️⃣ Setup MongoDB

**Option A: Local MongoDB**
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Open MongoDB Compass
4. Create database: `expense_tracker`

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Whitelist your IP address

### 3️⃣ Configure Backend Environment

1. Navigate to Backend folder
2. Copy `.env.example` to `.env`:
   ```bash
   cd Backend
   copy .env.example .env
   ```

3. Edit `.env` file with your settings:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/expense_tracker
   JWT_SECRET=your_super_secret_key_here_change_this
   PORT=5000
   NODE_ENV=development
   ```

   **Important**: Change `JWT_SECRET` to a random secure string!

### 4️⃣ Start the Application

#### Terminal 1 - Backend
```bash
cd c:\Games\Projects\Expense-Tracker-MERN\Backend
npm run dev
```
✅ Backend should start on http://localhost:5000

#### Terminal 2 - Frontend
```bash
cd c:\Games\Projects\Expense-Tracker-MERN\Frontend
npm start
```
✅ Frontend should open automatically at http://localhost:3000

### 5️⃣ Test the Application

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Add Transaction**: Create your first income/expense
4. **View Charts**: Check the analytics dashboard
5. **Toggle Dark Mode**: Click moon/sun icon
6. **Test Alert**: Add expenses that exceed 80% of income

## 🔍 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database name is correct

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Set `PORT=3001` in terminal before `npm start`

### CORS Error
- Ensure backend is running on port 5000
- Check `proxy` in Frontend/package.json

### JWT Error
- Clear browser cookies and localStorage
- Logout and login again

## 📦 Package Versions

### Backend Dependencies
- express: ^4.18.2
- mongoose: ^7.5.0
- bcryptjs: ^2.4.3
- jsonwebtoken: ^9.0.2
- cookie-parser: ^1.4.6
- cors: ^2.8.5
- dotenv: ^16.3.1

### Frontend Dependencies
- react: ^18.2.0
- react-router-dom: ^6.16.0
- axios: ^1.5.0
- chart.js: ^4.4.0
- react-chartjs-2: ^5.2.0
- react-icons: ^4.11.0

## 🎯 Default Categories

### Income Categories
- Salary
- Freelance
- Investment
- Other Income

### Expense Categories
- Food
- Travel
- Shopping
- Rent
- Bills
- Entertainment
- Healthcare
- Education
- Other Expense

## 🔐 Security Notes

1. **Never commit `.env` file** to version control
2. Use strong JWT secret in production
3. Enable HTTPS in production
4. Use MongoDB Atlas with authentication
5. Implement rate limiting for production

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 💡 Tips

- Use dark mode for better eye comfort
- Add transactions regularly for accurate analytics
- Review monthly trends to track spending habits
- Set income first to enable spending alerts
- Use descriptive titles for easy searching

## 🆘 Need Help?

Check the main README.md for detailed documentation and API endpoints.

---

**Happy Expense Tracking! 💰**
