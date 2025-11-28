# 🚀 QUICK REFERENCE - START HERE!

## 30-Second Setup

```bash
# 1. Create Database (One time only)
mysql -u root -proot -e "CREATE DATABASE foodapp;"

# 2. Terminal 1 - Start Backend
cd backend
mvn clean install
mvn spring-boot:run

# 3. Terminal 2 - Start Frontend
cd frontend
npm install
npm start

# 4. Open Browser
http://localhost:3007
```

---

## Ports
- **Frontend:** http://localhost:3007
- **Backend:** http://localhost:8087
- **Database:** localhost:3306 (foodapp)

---

## Credentials
- **DB User:** root
- **DB Pass:** root
- **Create new account** on signup page

---

## First Time Users

1. Go to http://localhost:3007
2. Click "Sign up here"
3. Create account (pick User or Admin)
4. Browse food & add to cart
5. Checkout to place order
6. View order history

---

## Files to Know

| File | Purpose |
|------|---------|
| `frontend/package.json` | NPM dependencies |
| `backend/pom.xml` | Maven dependencies |
| `backend/src/main/resources/application.properties` | DB config |
| `frontend/src/api/api.js` | API calls |
| `README.md` | Full documentation |
| `BUILD_AND_RUN.md` | All commands |

---

## Common Issues

| Issue | Solution |
|-------|----------|
| `mvn: command not found` | Install Maven or add to PATH |
| `Port 3007 in use` | `PORT=3008 npm start` |
| `Port 8087 in use` | Change in application.properties |
| `MySQL error` | Create database: `CREATE DATABASE foodapp;` |
| `npm install fails` | `npm cache clean --force` then retry |
| `CORS error` | Ensure backend is running on 8087 |

---

## Key Directories

```
frontend/src/pages/         → User pages
frontend/src/components/    → Reusable components
backend/src/.../entity/     → Database models
backend/src/.../controller/ → API endpoints
backend/src/.../service/    → Business logic
```

---

## Database Tables
- `users` - User accounts
- `food_items` - Food catalog
- `cart_items` - Shopping carts
- `orders` - Customer orders

---

## Sample Foods
1. Margherita Pizza - ₹250
2. Classic Burger - ₹150
3. Chicken Biryani - ₹300
4. Carbonara Pasta - ₹200
5. Samosa - ₹50
6. Chow Mein - ₹120

---

## API Summary

```
POST   /api/auth/login              → Login
POST   /api/auth/signup             → Signup
GET    /api/food/all                → Get foods
POST   /api/food/add                → Add food (Admin)
POST   /api/cart/add                → Add to cart
GET    /api/cart/view               → View cart
POST   /api/order/checkout          → Place order
GET    /api/order/user-orders       → Your orders
GET    /api/order/all-orders        → All orders (Admin)
```

---

## Features

✅ Login/Signup  
✅ Browse foods  
✅ Add to cart  
✅ Checkout  
✅ Order history  
✅ Admin panel  
✅ Add/Edit/Delete foods  
✅ View all orders  

---

## Build Commands

```bash
# Backend
mvn clean install    # Build
mvn spring-boot:run  # Run
mvn clean package    # JAR

# Frontend
npm install          # Install
npm start           # Run
npm build           # Production build
```

---

## Configuration Files

**Backend Config:** `backend/src/main/resources/application.properties`
- Database URL, username, password
- Server port (8087)
- JWT secret & expiration

**CORS Config:** `backend/src/main/java/.../config/CorsConfig.java`
- Frontend origin: http://localhost:3007

---

## Authentication

- **JWT tokens** generated on login
- **Token stored** in browser localStorage
- **Auto-included** in API requests
- **Expires in** 24 hours

---

## Useful Commands

```bash
# Check Java
java -version

# Check Maven
mvn -version

# Check Node
node -v
npm -v

# Create DB
mysql -u root -proot -e "CREATE DATABASE foodapp;"

# View processes
netstat -ano | findstr :3007
netstat -ano | findstr :8087
```

---

## File Count Summary

- **Frontend:** 15 files (6 pages, 3 components, context, api, config)
- **Backend:** 25 files (entities, DTOs, controllers, services, repositories)
- **Configuration:** 4 files (README, SETUP_GUIDE, BUILD_AND_RUN, SUMMARY)
- **Total:** 44 files ready to use

---

## Stack Overview

```
Frontend                 Backend                  Database
┌──────────────┐    ┌──────────────┐         ┌──────────────┐
│ React 18     │    │ Spring Boot  │────────→│ MySQL 8.0    │
│ React Router │    │ Spring Data  │         │              │
│ Axios        │    │ JPA          │         │ Tables:      │
│ Context API  │    │ JWT Auth     │         │ • users      │
│ CSS3         │    │ Lombok       │         │ • foods      │
└──────────────┘    └──────────────┘         │ • carts      │
   Port 3007            Port 8087            │ • orders     │
                                             └──────────────┘
                                                Port 3306
```

---

## Next Steps

1. ✅ Create database (one-time)
2. ✅ Start backend
3. ✅ Start frontend
4. ✅ Open http://localhost:3007
5. ✅ Sign up & explore

---

## Documentation

- **README.md** - Full features & APIs
- **SETUP_GUIDE.md** - Detailed setup steps
- **BUILD_AND_RUN.md** - All commands & troubleshooting
- **COMPLETE_SUMMARY.md** - Full feature list
- **QUICK_REFERENCE.md** - This file!

---

## Support Resources

Check these files for help:
1. **BUILD_AND_RUN.md** - Commands & troubleshooting
2. **SETUP_GUIDE.md** - Step-by-step setup
3. **README.md** - API endpoints & features

---

## ⚡ Ready?

```bash
cd backend && mvn spring-boot:run
# In another terminal:
cd frontend && npm start
# Open: http://localhost:3007
```

**That's it! Enjoy! 🎉**

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** November 2024
