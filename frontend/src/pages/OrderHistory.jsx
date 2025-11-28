import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { orderAPI } from '../api/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrders();
      setOrders(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Order History</h2>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty-message">
            No orders found
            <br />
            <button className="btn" onClick={() => navigate('/user/home')} style={{ marginTop: '20px', maxWidth: '200px' }}>
              Start Ordering
            </button>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-id">Order #{order.id}</div>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
                <div className="order-items">
                  <strong>Items:</strong> {order.itemSummary}
                </div>
                <div className="order-total">
                  Total: ₹{order.totalAmount.toFixed(2)}
                </div>
                <div style={{ fontSize: '13px', color: '#7f8c8d', marginTop: '10px' }}>
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-20">
          <button className="btn" onClick={() => navigate('/user/home')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
