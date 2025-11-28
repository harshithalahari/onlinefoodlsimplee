# Food Delivery System

## Project Structure

```
onlinefoodlsimplee/
├── frontend/                  # React Frontend (Port 3007)
│   ├── src/
│   │   ├── pages/            # Login, Signup, UserHome, AdminHome, Cart, OrderHistory
│   │   ├── components/       # FoodItem, Navbar, PrivateRoute
│   │   ├── context/          # AuthContext
│   │   ├── api/              # api.js (Axios configuration)
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── public/
│
└── backend/                   # Spring Boot Backend (Port 8087)
    ├── src/main/java/com/fooddelivery/
    │   ├── entity/           # User, FoodItem, CartItem, Order
    │   ├── dto/              # LoginRequest, SignupRequest, etc.
    │   ├── controller/       # AuthController, FoodController, OrderController, CartController
    │   ├── service/          # AuthService, FoodService, CartService, OrderService
    │   ├── repository/       # JPA Repositories
    │   ├── config/           # CorsConfig, DataInitializer
    │   ├── util/             # JwtUtil
    │   └── FoodDeliveryApplication.java
    ├── src/main/resources/
    │   └── application.properties
    └── pom.xml
```

## Prerequisites

1. **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
2. **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
3. **Node.js 16+** - [Download](https://nodejs.org/)
4. **MySQL 8.0+** - [Download](https://www.mysql.com/downloads/)

## Setup Instructions

### Step 1: Create MySQL Database

```sql
CREATE DATABASE foodapp;
```

Or use MySQL CLI:
```bash
mysql -u root -p
mysql> CREATE DATABASE foodapp;
mysql> EXIT;
```

### Step 2: Build Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on **http://localhost:8087**

### Step 3: Setup Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will start on **http://localhost:3007**

## Default Database Credentials

- **Database Name:** foodapp
- **Username:** root
- **Password:** root
- **Host:** localhost:3306

## Test Credentials

After starting the application, you can create new accounts or use:

### User Account
- **Email:** user@example.com
- **Password:** password123
- **Role:** User

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123
- **Role:** Admin

## Features

### User Side
✅ Signup / Login  
✅ Browse Food Items  
✅ Add to Cart  
✅ View Cart  
✅ Checkout  
✅ View Order History  

### Admin Side
✅ Admin Login  
✅ Add Food Items  
✅ Update Food Items  
✅ Delete Food Items  
✅ View All Orders  

## API Endpoints

### Auth
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Food
- `GET /api/food/all` - Get all food items
- `POST /api/food/add` - Add food (Admin only)
- `PUT /api/food/update/{id}` - Update food (Admin only)
- `DELETE /api/food/delete/{id}` - Delete food (Admin only)

### Cart
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/view` - View cart
- `PUT /api/cart/update/{cartId}` - Update cart item quantity
- `DELETE /api/cart/remove/{cartId}` - Remove item from cart

### Order
- `POST /api/order/checkout` - Place order
- `GET /api/order/user-orders` - Get user's orders
- `GET /api/order/all-orders` - Get all orders (Admin only)

## Running Commands

### Frontend
```bash
cd frontend
npm install      # Install dependencies
npm start        # Start development server (Port 3007)
npm build        # Build for production
```

### Backend
```bash
cd backend
mvn clean install           # Install dependencies
mvn spring-boot:run        # Run the application (Port 8087)
mvn clean package          # Build JAR file
java -jar target/food-delivery-backend-1.0.0.jar  # Run JAR
```

## Sample Food Items

The application automatically initializes with sample food items:
1. Margherita Pizza - ₹250
2. Classic Burger - ₹150
3. Chicken Biryani - ₹300
4. Carbonara Pasta - ₹200
5. Samosa - ₹50
6. Chow Mein - ₹120

## Port Configuration

- **Frontend:** http://localhost:3007
- **Backend:** http://localhost:8087
- **Database:** localhost:3306

## Notes

- JWT tokens are used for authentication and are valid for 24 hours
- Passwords are stored as plain text (for simplicity). In production, use bcrypt or similar
- CORS is configured to allow requests from frontend to backend
- Database schema is automatically created on first run

## Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify database `foodapp` exists
- Check if port 8087 is available

### Frontend won't connect to backend
- Ensure backend is running on port 8087
- Check CORS configuration in `CorsConfig.java`
- Verify API URL in `frontend/src/api/api.js`

### Port already in use
```bash
# Change port in application.properties (backend)
server.port=8087

# Change port in frontend package.json or use:
PORT=3007 npm start
```
