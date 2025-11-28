import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar">
      <h1 onClick={() => handleNavigation(user?.role === 'ADMIN' ? '/admin/home' : '/user/home')}>
        🍔 FoodHub
      </h1>
      <div className="nav-links">
        {user && <span>{user.name}</span>}
        {user?.role === 'USER' && (
          <>
            <a onClick={() => handleNavigation('/user/home')} style={{ cursor: 'pointer' }}>
              Home
            </a>
            <a onClick={() => handleNavigation('/user/cart')} style={{ cursor: 'pointer' }}>
              Cart
            </a>
            <a onClick={() => handleNavigation('/user/orders')} style={{ cursor: 'pointer' }}>
              Orders
            </a>
          </>
        )}
        {user?.role === 'ADMIN' && (
          <a onClick={() => handleNavigation('/admin/home')} style={{ cursor: 'pointer' }}>
            Manage Foods
          </a>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
