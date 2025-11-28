# Build & Run Commands

## Prerequisites Check

Ensure you have installed:
```bash
java -version          # Should be Java 17+
mvn -version           # Should be Maven 3.6+
node -v                # Should be Node 16+
npm -v                 # Should be npm 8+
```

---

## Database Setup (One-time)

### Create Database
```bash
mysql -u root -p
# Enter password: root
```

Then in MySQL prompt:
```sql
CREATE DATABASE foodapp;
EXIT;
```

Or as one command:
```bash
mysql -u root -proot -e "CREATE DATABASE foodapp;"
```

---

## Backend Setup & Running

### Navigate to Backend
```bash
cd backend
```

### Install Dependencies & Build
```bash
mvn clean install
```

### Run the Application
```bash
mvn spring-boot:run
```

**Expected Output:**
```
...
Tomcat started on port(s): 8087 (http)
Started FoodDeliveryApplication in X.XXX seconds
```

✅ Backend is running on `http://localhost:8087`

### Alternative: Run JAR File
```bash
mvn clean package
java -jar target/food-delivery-backend-1.0.0.jar
```

---

## Frontend Setup & Running

### Open New Terminal Tab/Window

### Navigate to Frontend
```bash
cd frontend
```

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm start
```

**Expected Output:**
```
On Your Network:      http://192.168.x.x:3007
Local:                http://localhost:3007
```

✅ Frontend is running on `http://localhost:3007`

---

## Access the Application

1. Open your browser
2. Go to: `http://localhost:3007`
3. You should see the Login page
4. Click "Sign up here" to create an account

---

## Test User Setup

### Option 1: Create New Account
1. Go to signup page
2. Enter details:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123
   - Role: User (or Admin)
3. Click Sign Up
4. You'll be logged in automatically

### Option 2: Manual Database Insert (Optional)
```bash
mysql -u root -proot foodapp
```

Then run:
```sql
INSERT INTO users (name, email, password, role, created_at) 
VALUES ('Test User', 'user@test.com', 'pass123', 'USER', NOW());

INSERT INTO users (name, email, password, role, created_at) 
VALUES ('Admin User', 'admin@test.com', 'admin123', 'ADMIN', NOW());
```

---

## Common Commands

### Backend Commands

```bash
# Clean build
mvn clean

# Compile
mvn compile

# Test
mvn test

# Package
mvn package

# Run with Maven
mvn spring-boot:run

# Skip tests during build
mvn clean install -DskipTests
```

### Frontend Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject configuration (not recommended)
npm eject
```

---

## Stopping the Applications

### Backend (In Terminal Where It's Running)
```
Press Ctrl + C
```

### Frontend (In Terminal Where It's Running)
```
Press Ctrl + C
```

---

## Port Configuration

### Change Backend Port
Edit: `backend/src/main/resources/application.properties`
```properties
server.port=8088  # Change 8087 to any free port
```

### Change Frontend Port
```bash
PORT=3008 npm start  # Or use any free port
```

---

## Verify Everything Is Working

### Test Backend APIs

```bash
# In a new terminal, test login endpoint:
curl -X POST http://localhost:8087/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "role": "USER"
  }'

# Should return user and token information
```

### Test Frontend Connection
```bash
# Frontend will automatically connect to http://localhost:8087
# Check browser console for any CORS errors
# If everything works, login page will be visible
```

---

## Production Build

### Build Backend for Production
```bash
cd backend
mvn clean package -DskipTests
```

This creates: `target/food-delivery-backend-1.0.0.jar`

Run it with:
```bash
java -jar target/food-delivery-backend-1.0.0.jar
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

This creates: `build/` folder with optimized files

---

## Troubleshooting Commands

### Check if Port is In Use
```bash
# Windows
netstat -ano | findstr :8087
netstat -ano | findstr :3007

# Kill process using port (Windows)
taskkill /PID <PID> /F
```

### Clear NPM Cache
```bash
npm cache clean --force
```

### Reinstall Node Modules
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Check Maven Cache
```bash
mvn dependency:resolve
```

### View Backend Logs
```bash
# While running with: mvn spring-boot:run
# Or from JAR file output
```

### View Frontend Logs
```bash
# Check browser console: F12 or Ctrl+Shift+I
# Check network tab for API calls
```

---

## Summary of Commands

**First Time Setup:**
```bash
# Create database
mysql -u root -proot -e "CREATE DATABASE foodapp;"

# Terminal 1 - Backend
cd backend
mvn clean install
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

**Subsequent Runs:**
```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm start
```

**Production:**
```bash
# Backend
java -jar backend/target/food-delivery-backend-1.0.0.jar

# Frontend
npm run build
# Serve the build/ folder with a web server
```

---

## Sample cURL Commands

### Signup
```bash
curl -X POST http://localhost:8087/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "test123",
    "role": "USER"
  }'
```

### Login
```bash
curl -X POST http://localhost:8087/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "test123"
  }'
```

### Get All Foods
```bash
curl http://localhost:8087/api/food/all
```

### Add Food (Replace TOKEN with actual JWT token)
```bash
curl -X POST http://localhost:8087/api/food/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "New Dish",
    "description": "Delicious dish",
    "price": 250
  }'
```

---

## Useful Links

- Frontend: `http://localhost:3007`
- Backend API: `http://localhost:8087/api`
- MySQL Database: `localhost:3306`
- Database Name: `foodapp`

---

**Everything is ready to go! Happy coding! 🚀**
