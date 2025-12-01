import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>E-Commerce</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <span style={{ marginLeft: '1rem' }}>Hello, {user.name}</span>
            <button 
              onClick={onLogout}
              style={{ marginLeft: '1rem', background: 'none', border: '1px solid white', color: 'white', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;