import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { ThemeContext } from '../context/ThemeContext';
import './Charts.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Charts = ({ transactions, stats }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const textColor = isDarkMode ? '#f9fafb' : '#111827';
  const gridColor = isDarkMode ? '#374151' : '#e5e7eb';

  // Category breakdown for pie chart
  const categoryData = {
    labels: Object.keys(stats.categoryBreakdown || {}),
    datasets: [
      {
        label: 'Amount',
        data: Object.values(stats.categoryBreakdown || {}),
        backgroundColor: [
          '#6366f1',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#ec4899',
          '#14b8a6',
          '#f97316',
          '#06b6d4',
        ],
        borderWidth: 2,
        borderColor: isDarkMode ? '#111827' : '#ffffff',
      },
    ],
  };

  // Income vs Expense comparison
  const incomeExpenseData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [stats.totalIncome, stats.totalExpense],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 2,
        borderColor: isDarkMode ? '#111827' : '#ffffff',
      },
    ],
  };

  // Monthly trend (last 6 months)
  const getMonthlyData = () => {
    const months = [];
    const incomeData = [];
    const expenseData = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      months.push(monthName);

      const monthTransactions = transactions.filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getMonth() === date.getMonth() && tDate.getFullYear() === date.getFullYear()
        );
      });

      const monthIncome = monthTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const monthExpense = monthTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      incomeData.push(monthIncome);
      expenseData.push(monthExpense);
    }

    return { months, incomeData, expenseData };
  };

  const monthlyData = getMonthlyData();

  const trendData = {
    labels: monthlyData.months,
    datasets: [
      {
        label: 'Income',
        data: monthlyData.incomeData,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expense',
        data: monthlyData.expenseData,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          font: {
            size: 11,
          },
          padding: 10,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="charts-container">
      <div className="card chart-card">
        <h3>📈 Income vs Expense Trend</h3>
        <div className="chart-wrapper">
          <Line data={trendData} options={chartOptions} />
        </div>
      </div>

      <div className="charts-grid">
        <div className="card chart-card">
          <h3>🥧 Category Breakdown</h3>
          <div className="chart-wrapper pie-chart">
            {Object.keys(stats.categoryBreakdown || {}).length > 0 ? (
              <Pie data={categoryData} options={pieOptions} />
            ) : (
              <div className="empty-chart">
                <p>No data available</p>
              </div>
            )}
          </div>
        </div>

        <div className="card chart-card">
          <h3>💰 Income vs Expense</h3>
          <div className="chart-wrapper">
            <Bar data={incomeExpenseData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
