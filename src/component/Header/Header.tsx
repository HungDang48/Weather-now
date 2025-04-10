import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './header.css';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    // Cập nhật theme cho thẻ body khi component được render
    document.body.setAttribute('data-theme', theme);
  }, [theme]);  // Khi theme thay đổi, cập nhật lại thuộc tính data-theme của body

  return (
    <header className="header">
      <h1 className="logo">WeatherNow</h1>
      <div className="header-right">
        {/* <input type="text" placeholder="Search city..." /> */}
        <button onClick={toggleTheme} className="theme-btn">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
