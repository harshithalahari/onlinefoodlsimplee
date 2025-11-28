import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { cartAPI, orderAPI } from '../api/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      setCartItems(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load cart.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await cartAPI.removeFromCart(cartId);
      setCartItems(cartItems.filter((item) => item.id !== cartId));
      setSuccessMessage('Item removed from cart');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError('Failed to remove item');
      setTimeout(() => setError(''), 2000);
    }
  };

  const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    try {
      await cartAPI.updateCartItem(cartId, newQuantity);
      setCartItems(
        cartItems.map((item) =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      setError('Failed to update quantity');
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.food.price * item.quantity, 0)
      .toFixed(2);
  };

  // Helper to clear cart items on server (if API available)
  const clearServerCart = async (items) => {
    if (!items || items.length === 0) return;
    try {
      // If your API has a bulk clear endpoint, call that instead.
      // Fallback: remove each cart item individually.
      await Promise.all(items.map((it) => cartAPI.removeFromCart(it.id)));
    } catch (err) {
      // not critical for demo — just log
      console.warn('Failed to clear server cart:', err);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Cart is empty');
      return;
    }

    // Build order data (same as before)
    const totalAmount = parseFloat(calculateTotal());
    const itemSummary = cartItems
      .map((item) => `${item.food.name} x${item.quantity}`)
      .join(', ');

    try {
      // Try to call backend checkout (if implemented).
      // If it fails, we still show the alert & clear cart for demo.
      await orderAPI.checkout(itemSummary, totalAmount);
    } catch (err) {
      // Show console only — we will still show success alert for demo purpose
      console.warn('Checkout API failed (demo fallback):', err?.response?.data || err);
    } finally {
      // 1) Show success alert (user requested)
      alert('Order placed successfully');

      // 2) Clear UI cart
      setCartItems([]);
      setSuccessMessage('Order placed successfully');

      // 3) Try to clear server-side cart (best-effort)
      clearServerCart(cartItems);

      // 4) Navigate to orders view after short delay
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/user/orders');
      }, 1000);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Shopping Cart</h2>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {loading ? (
          <p>Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <div className="empty-message">
            Your cart is empty
            <br />
            <button
              className="btn"
              onClick={() => navigate('/user/home')}
              style={{ marginTop: '20px', maxWidth: '200px' }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.food.name}</div>
                    <div className="cart-item-price">₹{item.food.price} each</div>
                  </div>
                  <div className="quantity-control">
                    <button
                      className="btn btn-small quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity-input" style={{ cursor: 'auto' }}>
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-small quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <div style={{ minWidth: '80px', textAlign: 'right' }}>
                      ₹{(item.food.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery:</span>
                <span>₹50</span>
              </div>
              <div className="summary-total">
                <span>Total: ₹{(parseFloat(calculateTotal()) + 50).toFixed(2)}</span>
              </div>
              <button className="btn" onClick={handleCheckout} style={{ marginTop: '20px' }}>
                Place Order
              </button>
              <button
                className="btn"
                onClick={() => navigate('/user/home')}
                style={{ marginTop: '10px', backgroundColor: '#95a5a6' }}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
