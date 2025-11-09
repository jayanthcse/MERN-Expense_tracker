# 💰 Expense Tracker - MERN Stack

A full-featured expense tracking web application built with the MERN stack (MongoDB, Express.js, React, Node.js). Track your income and expenses, visualize spending patterns with interactive charts, and get alerts when spending exceeds 80% of income.

## ✨ Features

### 🔐 Authentication
- **JWT-based authentication** with HTTP-only cookies
- Secure password hashing using bcrypt
- User registration and login
- Protected routes and middleware

### 💸 Transaction Management
- Add, edit, and delete transactions
- Categorize transactions (Food, Travel, Salary, etc.)
- Track both income and expenses
- Date-based transaction records
- Search and filter transactions

### 📊 Analytics Dashboard
- **Total Income, Expenses, and Balance** overview
- **Interactive Charts** using Chart.js:
  - Pie chart for category-wise spending
  - Bar chart for income vs expense comparison
  - Line chart for 6-month trend analysis
- Real-time statistics updates

### 🎨 Modern UI/UX
- Clean, responsive design
- **Dark mode toggle** with persistent preference
- Smooth animations and transitions
- Mobile-friendly interface
- Loading states and form validation

### ⚠️ Smart Alerts
- **80% Spending Alert**: Automatic popup when expenses reach 80% of total income
- Visual progress indicators
- Dismissible alert modal

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Chart.js & react-chartjs-2** - Data visualization
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Styling with CSS variables for theming

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Expense-Tracker-MERN/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Transaction.js        # Transaction schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── transactionRoutes.js  # Transaction CRUD
│   ├── .env.example              # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Entry point
│
└── Frontend/
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── src/
    │   ├── components/
    │   │   ├── Charts.js         # Chart visualizations
    │   │   ├── Navbar.js         # Navigation bar
    │   │   ├── SpendingAlert.js  # 80% alert modal
    │   │   ├── StatsCards.js     # Statistics cards
    │   │   ├── TransactionForm.js # Add/Edit form
    │   │   └── TransactionList.js # Transaction table
    │   ├── context/
    │   │   ├── AuthContext.js    # Auth state management
    │   │   └── ThemeContext.js   # Dark mode management
    │   ├── pages/
    │   │   ├── Dashboard.js      # Main dashboard
    │   │   ├── Login.js          # Login page
    │   │   └── Register.js       # Registration page
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .gitignore
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

#### 1. Clone or navigate to the project
```bash
cd c:\Games\Projects\Expense-Tracker-MERN
```

#### 2. Backend Setup

```bash
cd Backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Edit .env file with your configuration:
# MONGODB_URI=mongodb://127.0.0.1:27017/expense_tracker
# JWT_SECRET=your_super_secret_jwt_key_change_this
# PORT=5000
# NODE_ENV=development
```

**Create MongoDB Database:**
- Open MongoDB Compass
- Create Database: `expense_tracker`
- Collections will be created automatically

#### 3. Frontend Setup

```bash
cd ../Frontend

# Install dependencies
npm install
```

### Running the Application

#### Start Backend Server
```bash
cd Backend
npm run dev
# Server runs on http://localhost:5000
```

#### Start Frontend (in a new terminal)
```bash
cd Frontend
npm start
# App runs on http://localhost:3000
```

## 📱 Usage

### 1. Register/Login
- Create a new account or login with existing credentials
- Passwords are securely hashed before storage

### 2. Add Transactions
- Click the transaction form
- Select type (Income/Expense)
- Fill in title, amount, category, and date
- Submit to add transaction

### 3. View Analytics
- Dashboard displays total income, expenses, and balance
- Interactive charts show spending patterns
- Filter and search transactions

### 4. Edit/Delete Transactions
- Click edit icon to modify a transaction
- Click delete icon to remove a transaction

### 5. Dark Mode
- Toggle dark mode using the moon/sun icon in navbar
- Preference is saved in localStorage

### 6. Spending Alert
- Alert appears when expenses reach 80% of income
- Click "Got it!" to dismiss

## 🔒 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Transactions
- `GET /api/transactions` - Get all user transactions
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/stats/summary` - Get statistics

## 🎨 Features in Detail

### Dark Mode
- Persistent theme preference
- Smooth transitions between themes
- CSS variables for easy customization

### Charts
- **Pie Chart**: Category-wise spending breakdown
- **Bar Chart**: Income vs Expense comparison
- **Line Chart**: 6-month trend analysis
- Responsive and interactive

### 80% Spending Alert
- Automatically calculates expense percentage
- Shows warning when threshold is reached
- Visual progress bar
- Dismissible modal

## 🌐 Deployment

### Backend (Render)
1. Create account on Render
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Frontend (Vercel)
1. Create account on Vercel
2. Import project
3. Configure build settings
4. Deploy

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in backend

## 🔧 Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using MERN Stack

## 🙏 Acknowledgments

- Chart.js for beautiful charts
- React Icons for icon library
- MongoDB for database
- Express.js for backend framework

---

**Happy Tracking! 💰📊**
