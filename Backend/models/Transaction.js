const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
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
        'Other Expense',
      ],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
