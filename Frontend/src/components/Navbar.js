import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>💰 Expense Tracker</h2>
        </div>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="btn-icon" title="Toggle Theme">
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          <div className="user-info">
            <span>Hello, {user?.name}</span>
          </div>

          <button onClick={handleLogout} className="btn btn-danger btn-logout">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
