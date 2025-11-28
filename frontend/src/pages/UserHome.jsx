import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FoodItem from '../components/FoodItem';
import { foodAPI, cartAPI } from '../api/api';

const UserHome = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await foodAPI.getAllFoods();
      setFoods(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load foods. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (foodId, quantity) => {
    try {
      await cartAPI.addToCart(foodId, quantity);
      setSuccessMessage('Item added to cart!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError('Failed to add item to cart.');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Browse Food Items</h2>
        
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {loading ? (
          <p>Loading foods...</p>
        ) : foods.length === 0 ? (
          <div className="empty-message">No food items available</div>
        ) : (
          <div className="food-grid">
            {foods.map((food) => (
              <FoodItem
                key={food.id}
                food={food}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-20">
          <button className="btn" onClick={() => navigate('/user/cart')}>
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
