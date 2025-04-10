import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './header.css';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Lấy context

  return (
    <header className="header">
      <h1 className="logo">WeatherNow</h1>
      <div className="header-right">
        <input type="text" placeholder="Search city..." />
        <button onClick={toggleTheme} className="theme-btn">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
