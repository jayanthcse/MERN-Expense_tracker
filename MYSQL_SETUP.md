# 🗄️ MySQL Local Setup Guide

## 📋 Prerequisites

1. **MySQL Server** installed on your system
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or install via package manager (e.g., `winget install MySQL.MySQL`)

2. **MySQL Workbench** (Optional but recommended)
   - Download from: https://dev.mysql.com/downloads/workbench/

---

## 🔧 Step 1: Create MySQL Database

### Option A: Using MySQL Command Line

1. Open MySQL Command Line Client or terminal
2. Login as root:
   ```bash
   mysql -u root -p
   ```
3. Enter your password: `Jay@2004`

4. Create the database:
   ```sql
   CREATE DATABASE expense_tracker;
   ```

5. Verify database creation:
   ```sql
   SHOW DATABASES;
   ```

6. Exit MySQL:
   ```sql
   EXIT;
   ```

### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your local MySQL server (root / Jay@2004)
3. Click on "Create a new schema" icon
4. Name it: `expense_tracker`
5. Click "Apply"

---

## 🔑 Step 2: Configure Backend Environment

1. Navigate to the Backend folder:
   ```bash
   cd Backend
   ```

2. Create a `.env` file (copy from `.env.example`):
   ```bash
   copy .env.example .env
   ```

3. The `.env` file should contain:
   ```env
   # MySQL Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=Jay@2004
   DB_NAME=expense_tracker

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

---

## 📦 Step 3: Install Dependencies

```bash
cd Backend
npm install
```

This will install:
- `mysql2` - MySQL driver for Node.js
- `sequelize` - ORM for MySQL
- Other dependencies (express, bcryptjs, jsonwebtoken, etc.)

---

## 🚀 Step 4: Start the Backend Server

```bash
npm run dev
```

You should see:
```
✅ MySQL Database connected successfully!
✅ Database models synchronized!
🚀 Server running on port 5000
```

**Note**: Sequelize will automatically create the tables (`users` and `transactions`) when you start the server for the first time.

---

## 🎨 Step 5: Start the Frontend

1. Open a new terminal
2. Navigate to Frontend folder:
   ```bash
   cd Frontend
   ```

3. Install dependencies (if not already done):
   ```bash
   npm install
   ```

4. Create `.env` file:
   ```bash
   copy .env.example .env
   ```

5. The `.env` file should contain:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

6. Start the frontend:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category ENUM('Salary','Freelance','Investment','Other Income','Food','Travel','Shopping','Rent','Bills','Entertainment','Healthcare','Education','Other Expense') NOT NULL,
  type ENUM('income','expense') NOT NULL,
  date DATETIME NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

**Note**: These tables will be created automatically by Sequelize!

---

## 🔍 Verify Database Tables

### Using MySQL Command Line:
```bash
mysql -u root -p
```

```sql
USE expense_tracker;
SHOW TABLES;
DESCRIBE users;
DESCRIBE transactions;
```

### Using MySQL Workbench:
1. Connect to your local server
2. Expand the `expense_tracker` schema
3. View tables under "Tables" section

---

## 🐛 Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"
- Verify your MySQL password is `Jay@2004`
- Try resetting MySQL root password if needed

### Error: "ER_NOT_SUPPORTED_AUTH_MODE"
- Run this in MySQL:
  ```sql
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Jay@2004';
  FLUSH PRIVILEGES;
  ```

### Error: "Can't connect to MySQL server"
- Ensure MySQL service is running
- Windows: Check Services (Win+R → `services.msc` → MySQL)
- Verify port 3306 is not blocked by firewall

### Error: "Database 'expense_tracker' doesn't exist"
- Create the database manually using Step 1

### Tables not created automatically
- Check server logs for errors
- Manually run the SQL schema from "Database Schema" section above

---

## 📝 Testing the Setup

1. **Register a new user**:
   - Go to `http://localhost:3000`
   - Click "Register"
   - Create an account

2. **Verify in database**:
   ```sql
   USE expense_tracker;
   SELECT * FROM users;
   ```

3. **Add a transaction**:
   - Login to the app
   - Add an income or expense
   - Verify in database:
   ```sql
   SELECT * FROM transactions;
   ```

---

## 🎉 Success!

Your MERN Expense Tracker is now running with a local MySQL database!

**URLs:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- Database: `localhost:3306/expense_tracker`

---

## 🔄 Key Differences from MongoDB

| Feature | MongoDB | MySQL (Sequelize) |
|---------|---------|-------------------|
| ID Field | `_id` (ObjectId) | `id` (Integer) |
| Find One | `findOne({ email })` | `findOne({ where: { email } })` |
| Find All | `find({ userId })` | `findAll({ where: { userId } })` |
| Find by ID | `findById(id)` | `findByPk(id)` |
| Update | `save()` | `update({})` |
| Delete | `deleteOne()` | `destroy()` |
| Sort | `.sort({ date: -1 })` | `order: [['date', 'DESC']]` |

---

## 📚 Additional Resources

- MySQL Documentation: https://dev.mysql.com/doc/
- Sequelize Documentation: https://sequelize.org/docs/v6/
- MySQL Workbench Guide: https://dev.mysql.com/doc/workbench/en/
