import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Charts from '../components/Charts';
import SpendingAlert from '../components/SpendingAlert';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categoryBreakdown: {},
  });
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchTransactions();
      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    // Check if expenses exceed 80% of income
    if (stats.totalIncome > 0) {
      const expensePercentage = (stats.totalExpense / stats.totalIncome) * 100;
      if (expensePercentage >= 80) {
        setShowAlert(true);
      }
    }
  }, [stats]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/transactions/stats/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/transactions', transactionData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
      fetchStats();
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  const handleUpdateTransaction = async (id, transactionData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/transactions/${id}`, transactionData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
      fetchStats();
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/transactions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTransactions();
        fetchStats();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  if (authLoading || loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />
      
      {showAlert && (
        <SpendingAlert
          percentage={(stats.totalExpense / stats.totalIncome) * 100}
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}! 👋</h1>
          <p>Here's your financial overview</p>
        </div>

        <StatsCards stats={stats} />

        <div className="dashboard-grid">
          <div className="dashboard-left">
            <TransactionForm
              onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
              editingTransaction={editingTransaction}
              onCancel={handleCancelEdit}
            />
            <Charts transactions={transactions} stats={stats} />
          </div>

          <div className="dashboard-right">
            <TransactionList
              transactions={transactions}
              onEdit={handleEdit}
              onDelete={handleDeleteTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
