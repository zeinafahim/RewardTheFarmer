import React from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const goHomeTop = () => {
    // Always go to home and scroll to top
    window.location.hash = '/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToSection = (id) => {
    // Always ensure we're on home
    if (location.pathname !== '/') {
      window.location.hash = '/';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        {/* Logo */}
        <div className="logo" onClick={goHomeTop}>
          <i className="fa-solid fa-seedling"></i>
          <span>
            RewardA<span className="logo-accent">Farmer</span>
          </span>
        </div>

        {/* Navigation Links (ALWAYS VISIBLE) */}
        <div className="navbar-links">
          <button className="nav-item link-button" onClick={goHomeTop}>
            Home
          </button>
          <button
            className="nav-item link-button"
            onClick={() => goToSection('contact')}
          >
            About
          </button>
          <button
            className="nav-item link-button"
            onClick={() => goToSection('contact')}
          >
            Contact
          </button>
        </div>

        {/* Auth Area */}
        <div className="navbar-actions">
          {user && (
            <button onClick={onLogout} className="btn-logout">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
