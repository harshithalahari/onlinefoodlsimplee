import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/home" element={<PrivateRoute><UserHome /></PrivateRoute>} />
          <Route path="/user/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/user/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
          <Route path="/admin/home" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
