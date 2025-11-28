import React, { useState } from 'react';

const FoodItem = ({ food, onAddToCart, onEdit, onDelete, isAdmin = false }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(food.id, quantity);
      setQuantity(1);
    }
  };

  return (
    <div className="food-card">
      <div className="food-image">🍽️</div>
      <div className="food-info">
        <div className="food-name">{food.name}</div>
        <div className="food-description">{food.description}</div>
        <div className="food-price">₹{food.price}</div>
        {isAdmin ? (
          <div className="food-actions">
            <button className="btn btn-small" onClick={() => onEdit(food)}>
              Edit
            </button>
            <button className="btn btn-small btn-danger" onClick={() => onDelete(food.id)}>
              Delete
            </button>
          </div>
        ) : (
          <div className="food-actions">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="quantity-input"
            />
            <button className="btn btn-small btn-success" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
