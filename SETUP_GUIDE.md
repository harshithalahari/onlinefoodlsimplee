# 🍔 Food Delivery System - Setup Complete!

## ✅ What Has Been Created

### Frontend (React) - Running on Port 3007

**Pages:**
- ✅ `src/pages/Login.jsx` - User/Admin login
- ✅ `src/pages/Signup.jsx` - User/Admin registration
- ✅ `src/pages/UserHome.jsx` - Browse food items
- ✅ `src/pages/Cart.jsx` - Shopping cart with checkout
- ✅ `src/pages/OrderHistory.jsx` - View past orders
- ✅ `src/pages/AdminHome.jsx` - Admin dashboard for food & order management

**Components:**
- ✅ `src/components/FoodItem.jsx` - Food card component
- ✅ `src/components/Navbar.jsx` - Navigation bar
- ✅ `src/components/PrivateRoute.jsx` - Protected routes

**Utilities:**
- ✅ `src/context/AuthContext.jsx` - Authentication state management
- ✅ `src/api/api.js` - Axios API configuration with JWT interceptor
- ✅ `src/App.jsx` - Main app with routing
- ✅ `src/App.css` - Complete styling
- ✅ `package.json` - Dependencies configured

### Backend (Spring Boot) - Running on Port 8087

**Entities (Database Models):**
- ✅ `User.java` - User model with roles (USER/ADMIN)
- ✅ `FoodItem.java` - Food items model
- ✅ `CartItem.java` - Shopping cart model
- ✅ `Order.java` - Orders model

**DTOs (Data Transfer Objects):**
- ✅ `LoginRequest.java`
- ✅ `SignupRequest.java`
- ✅ `AuthResponse.java`
- ✅ `UserDto.java`
- ✅ `CartItemDto.java`
- ✅ `OrderDto.java`
- ✅ `CheckoutRequest.java`

**Controllers:**
- ✅ `AuthController.java` - Login/Signup endpoints
- ✅ `FoodController.java` - Food CRUD endpoints
- ✅ `CartController.java` - Cart management endpoints
- ✅ `OrderController.java` - Order endpoints

**Services:**
- ✅ `AuthService.java` - Authentication logic
- ✅ `FoodService.java` - Food business logic
- ✅ `CartService.java` - Cart management logic
- ✅ `OrderService.java` - Order processing logic

**Repositories:**
- ✅ `UserRepository.java` - User database access
- ✅ `FoodItemRepository.java` - Food database access
- ✅ `CartItemRepository.java` - Cart database access
- ✅ `OrderRepository.java` - Order database access

**Configuration & Utilities:**
- ✅ `JwtUtil.java` - JWT token generation & validation
- ✅ `CorsConfig.java` - CORS configuration for frontend
- ✅ `DataInitializer.java` - Sample food data initialization
- ✅ `application.properties` - Database & server config

---

## 🚀 Quick Start Guide

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 16+
- MySQL 8.0+

### Step 1: Create Database
```bash
mysql -u root -p
CREATE DATABASE foodapp;
EXIT;
```

### Step 2: Start Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
✅ Backend running on: `http://localhost:8087`

### Step 3: Start Frontend
```bash
cd frontend
npm install
npm start
```
✅ Frontend running on: `http://localhost:3007`

---

## 📋 User Workflow

### For Regular Users:
1. **Signup** → Create account with email and password
2. **Login** → Access food ordering
3. **Browse** → View all available food items
4. **Add to Cart** → Select quantity and add items
5. **View Cart** → Review items, adjust quantities
6. **Checkout** → Place order (automatically clears cart)
7. **Order History** → View past orders and status

### For Admin:
1. **Signup/Login** → Choose "Admin" role during signup
2. **Manage Foods** → Add, edit, or delete food items
3. **View Orders** → See all customer orders with details

---

## 🔐 Authentication Flow

- **JWT Tokens** used for secure authentication
- **Token stored** in localStorage on frontend
- **Automatic token inclusion** in API requests via Axios interceptor
- **Token validation** on every protected endpoint

---

## 📱 API Overview

### Auth APIs
```
POST   /api/auth/login          - Login
POST   /api/auth/signup         - Register
```

### Food APIs
```
GET    /api/food/all            - Get all foods
POST   /api/food/add            - Add food (Admin)
PUT    /api/food/update/{id}    - Update food (Admin)
DELETE /api/food/delete/{id}    - Delete food (Admin)
```

### Cart APIs
```
POST   /api/cart/add            - Add to cart
GET    /api/cart/view           - View cart
PUT    /api/cart/update/{id}    - Update quantity
DELETE /api/cart/remove/{id}    - Remove from cart
```

### Order APIs
```
POST   /api/order/checkout      - Place order
GET    /api/order/user-orders   - User's orders
GET    /api/order/all-orders    - All orders (Admin)
```

---

## 🍽️ Sample Foods (Auto-loaded)

1. **Margherita Pizza** - ₹250
2. **Classic Burger** - ₹150
3. **Chicken Biryani** - ₹300
4. **Carbonara Pasta** - ₹200
5. **Samosa** - ₹50
6. **Chow Mein** - ₹120

---

## 💾 Database Configuration

**File:** `backend/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/foodapp
spring.datasource.username=root
spring.datasource.password=root
server.port=8087
```

**Database Tables Auto-created:**
- `users` - User accounts
- `food_items` - Food catalog
- `cart_items` - Shopping carts
- `orders` - Customer orders

---

## 🛠️ Technology Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- Context API
- CSS3

**Backend:**
- Spring Boot 3.1.5
- Spring Data JPA
- MySQL 8.0
- JWT (io.jsonwebtoken)
- Lombok
- Maven

---

## ⚠️ Important Notes

1. **Password Storage**: Currently plain text (for simplicity). Use bcrypt in production!
2. **JWT Expiry**: Tokens valid for 24 hours
3. **CORS Configuration**: Configured for localhost:3007
4. **Database**: Auto-creates tables on first run
5. **Port Conflicts**: Ensure ports 3007 and 8087 are free

---

## 🔧 Troubleshooting

### Backend Issues
- MySQL not running? Start MySQL service
- Port 8087 in use? Change in `application.properties`
- Build errors? Ensure Java 17+ installed

### Frontend Issues
- Dependencies not installing? Delete `node_modules`, run `npm install` again
- API not connecting? Check backend is running on port 8087
- Port 3007 in use? Kill process or use `PORT=3008 npm start`

---

## 📁 File Structure Summary

```
onlinefoodlsimplee/
├── frontend/
│   ├── src/
│   │   ├── pages/          (6 pages)
│   │   ├── components/     (3 components)
│   │   ├── context/        (1 context)
│   │   ├── api/            (1 API file)
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .gitignore
│
├── backend/
│   ├── src/main/java/com/fooddelivery/
│   │   ├── entity/         (4 entities)
│   │   ├── dto/            (7 DTOs)
│   │   ├── controller/     (4 controllers)
│   │   ├── service/        (4 services)
│   │   ├── repository/     (4 repositories)
│   │   ├── config/         (2 config files)
│   │   ├── util/           (1 utility)
│   │   └── FoodDeliveryApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── .gitignore
│
├── README.md
└── SETUP_GUIDE.md (this file)
```

---

## ✨ All Features Implemented

✅ User Registration & Login  
✅ Admin Registration & Login  
✅ Food Browsing (Grid Layout)  
✅ Add to Cart (with Quantity)  
✅ View Cart (with Edit/Delete)  
✅ Checkout (Clears Cart)  
✅ Order History  
✅ Admin: Add Food  
✅ Admin: Edit Food  
✅ Admin: Delete Food  
✅ Admin: View All Orders  
✅ JWT Authentication  
✅ CORS Configuration  
✅ Protected Routes  
✅ Clean UI with CSS  
✅ Error Handling  
✅ Success Messages  

---

## 🎯 Ready to Use!

Everything is configured and ready to run. Just:
1. Create the database
2. Start the backend
3. Start the frontend
4. Open http://localhost:3007 in your browser

**Enjoy your food delivery system! 🚀**
