import React, { useState } from 'react';
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaSearch } from 'react-icons/fa';
import './TransactionList.css';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="card transaction-list-card">
      <div className="transaction-list-header">
        <h3>📊 Recent Transactions</h3>
        <p className="transaction-count">{filteredTransactions.length} transactions</p>
      </div>

      <div className="transaction-filters">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterType === 'income' ? 'active' : ''}`}
            onClick={() => setFilterType('income')}
          >
            Income
          </button>
          <button
            className={`filter-btn ${filterType === 'expense' ? 'active' : ''}`}
            onClick={() => setFilterType('expense')}
          >
            Expense
          </button>
        </div>
      </div>

      <div className="transaction-list">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions found</p>
            <span>Start by adding your first transaction!</span>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className={`transaction-item ${transaction.type} fade-in`}
            >
              <div className="transaction-icon">
                {transaction.type === 'income' ? (
                  <FaArrowUp className="income-arrow" />
                ) : (
                  <FaArrowDown className="expense-arrow" />
                )}
              </div>

              <div className="transaction-details">
                <h4>{transaction.title}</h4>
                <div className="transaction-meta">
                  <span className="category">{transaction.category}</span>
                  <span className="date">{formatDate(transaction.date)}</span>
                </div>
              </div>

              <div className="transaction-amount">
                <span className={`amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>

              <div className="transaction-actions">
                <button
                  onClick={() => onEdit(transaction)}
                  className="action-btn edit-btn"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(transaction._id)}
                  className="action-btn delete-btn"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
