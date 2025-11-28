import axios from 'axios';

const API_URL = 'http://localhost:8087/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password, role) => api.post('/auth/signup', { name, email, password, role }),
};

// Food APIs
export const foodAPI = {
  getAllFoods: () => api.get('/food/all'),
  addFood: (foodData) => api.post('/food/add', foodData),
  updateFood: (id, foodData) => api.put(`/food/update/${id}`, foodData),
  deleteFood: (id) => api.delete(`/food/delete/${id}`),
};

// Cart APIs
export const cartAPI = {
  addToCart: (foodId, quantity) => api.post('/cart/add', { foodId, quantity }),
  getCart: () => api.get('/cart/view'),
  removeFromCart: (cartId) => api.delete(`/cart/remove/${cartId}`),
  updateCartItem: (cartId, quantity) => api.put(`/cart/update/${cartId}`, { quantity }),
};

// Order APIs
export const orderAPI = {
  checkout: (cartItems, totalAmount) => api.post('/order/checkout', { cartItems, totalAmount }),
  getOrders: () => api.get('/order/user-orders'),
  getAllOrders: () => api.get('/order/all-orders'),
};

export default api;
