import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import './SpendingAlert.css';

const SpendingAlert = ({ percentage, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-modal fade-in">
        <button className="alert-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="alert-icon">
          <FaExclamationTriangle size={48} />
        </div>
        
        <h2>⚠️ Spending Alert!</h2>
        
        <p className="alert-message">
          You've spent <strong>{percentage.toFixed(1)}%</strong> of your total income!
        </p>
        
        <p className="alert-description">
          Your expenses are high. Consider reviewing your spending habits to maintain a healthy financial balance.
        </p>
        
        <div className="alert-progress">
          <div 
            className="alert-progress-bar" 
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        
        <button className="btn btn-primary" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default SpendingAlert;
