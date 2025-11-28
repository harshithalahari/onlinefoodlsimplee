import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FoodItem from '../components/FoodItem';
import { foodAPI, orderAPI } from '../api/api';

const AdminHome = () => {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [activeTab, setActiveTab] = useState('foods');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const foodResponse = await foodAPI.getAllFoods();
      setFoods(foodResponse.data);

      const ordersResponse = await orderAPI.getAllOrders();
      setOrders(ordersResponse.data);

      setError('');
    } catch (err) {
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price) {
      setError('All fields are required');
      return;
    }

    try {
      if (editingFood) {
        await foodAPI.updateFood(editingFood.id, formData);
        setSuccessMessage('Food updated successfully!');
      } else {
        await foodAPI.addFood(formData);
        setSuccessMessage('Food added successfully!');
      }

      setFormData({ name: '', description: '', price: '' });
      setEditingFood(null);
      setShowForm(false);
      fetchData();

      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save food.');
    }
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price,
    });
    setShowForm(true);
  };

  const handleDelete = async (foodId) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        await foodAPI.deleteFood(foodId);
        setSuccessMessage('Food deleted successfully!');
        fetchData();
        setTimeout(() => setSuccessMessage(''), 2000);
      } catch (err) {
        setError('Failed to delete food.');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingFood(null);
    setFormData({ name: '', description: '', price: '' });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Admin Dashboard</h2>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${activeTab === 'foods' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('foods')}
            style={{ backgroundColor: activeTab === 'foods' ? '#3498db' : '#95a5a6' }}
          >
            Manage Foods
          </button>
          <button
            className={`btn ${activeTab === 'orders' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('orders')}
            style={{ backgroundColor: activeTab === 'orders' ? '#3498db' : '#95a5a6', width: 'auto' }}
          >
            View Orders
          </button>
        </div>

        {activeTab === 'foods' && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <button className="btn" onClick={() => setShowForm(!showForm)} style={{ width: 'auto' }}>
                {showForm ? 'Cancel' : '+ Add New Food'}
              </button>
            </div>

            {showForm && (
              <div className="admin-form">
                <h3>{editingFood ? 'Edit Food Item' : 'Add New Food Item'}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Food Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter food name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter description"
                    />
                  </div>

                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      step="0.01"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn" style={{ width: 'auto' }}>
                      {editingFood ? 'Update' : 'Add'} Food
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleCancel}
                      style={{ width: 'auto', backgroundColor: '#95a5a6' }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <p>Loading foods...</p>
            ) : foods.length === 0 ? (
              <div className="empty-message">No food items found</div>
            ) : (
              <div className="food-grid">
                {foods.map((food) => (
                  <FoodItem
                    key={food.id}
                    food={food}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isAdmin={true}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'orders' && (
          <>
            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="empty-message">No orders found</div>
            ) : (
              <div>
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-id">Order #{order.id}</div>
                    <div style={{ color: '#7f8c8d', marginBottom: '10px' }}>
                      <strong>Customer:</strong> {order.user.name} ({order.user.email})
                    </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
