const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Transaction = sequelize.define(
  'Transaction',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a title',
        },
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide an amount',
        },
        isDecimal: {
          msg: 'Amount must be a valid number',
        },
      },
    },
    category: {
      type: DataTypes.ENUM(
        'Salary',
        'Freelance',
        'Investment',
        'Other Income',
        'Food',
        'Travel',
        'Shopping',
        'Rent',
        'Bills',
        'Entertainment',
        'Healthcare',
        'Education',
        'Other Expense'
      ),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a category',
        },
      },
    },
    type: {
      type: DataTypes.ENUM('income', 'expense'),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a transaction type',
        },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: 'transactions',
  }
);

module.exports = Transaction;
