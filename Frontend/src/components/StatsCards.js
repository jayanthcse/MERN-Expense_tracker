import React from 'react';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="stats-cards">
      <div className="stat-card income-card fade-in">
        <div className="stat-icon income-icon">
          <FaArrowUp size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Income</p>
          <h2 className="stat-value">{formatCurrency(stats.totalIncome)}</h2>
        </div>
      </div>

      <div className="stat-card expense-card fade-in">
        <div className="stat-icon expense-icon">
          <FaArrowDown size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Expenses</p>
          <h2 className="stat-value">{formatCurrency(stats.totalExpense)}</h2>
        </div>
      </div>

      <div className="stat-card balance-card fade-in">
        <div className="stat-icon balance-icon">
          <FaWallet size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Balance</p>
          <h2 className="stat-value">{formatCurrency(stats.balance)}</h2>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
