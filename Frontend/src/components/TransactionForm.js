import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTimes } from 'react-icons/fa';
import './TransactionForm.css';

const TransactionForm = ({ onSubmit, editingTransaction, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Other Income'];
  const expenseCategories = [
    'Food',
    'Travel',
    'Shopping',
    'Rent',
    'Bills',
    'Entertainment',
    'Healthcare',
    'Education',
    'Other Expense',
  ];

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        type: editingTransaction.type,
        date: new Date(editingTransaction.date).toISOString().split('T')[0],
      });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.amount || !formData.category) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    setLoading(true);

    try {
      if (editingTransaction) {
        await onSubmit(editingTransaction._id, formData);
      } else {
        await onSubmit(formData);
      }

      // Reset form
      setFormData({
        title: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      amount: '',
      category: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    });
    setError('');
    onCancel();
  };

  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="card transaction-form-card">
      <h3>{editingTransaction ? '✏️ Edit Transaction' : '➕ Add Transaction'}</h3>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <div className="type-selector">
              <button
                type="button"
                className={`type-btn ${formData.type === 'income' ? 'active income' : ''}`}
                onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
              >
                Income
              </button>
              <button
                type="button"
                className={`type-btn ${formData.type === 'expense' ? 'active expense' : ''}`}
                onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
              >
                Expense
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Grocery Shopping"
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <div className="form-actions">
          {editingTransaction && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              <FaTimes />
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`btn ${formData.type === 'income' ? 'btn-success' : 'btn-primary'}`}
            disabled={loading}
          >
            {editingTransaction ? <FaEdit /> : <FaPlus />}
            {loading ? 'Saving...' : editingTransaction ? 'Update' : 'Add Transaction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
