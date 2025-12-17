# 🏰 Transylvania Hotel Booking System - Demo Guide

## ✅ System Status

### Backend (Java 21 + Spring Boot + MySQL)
- **URL**: http://localhost:8080
- **API Base**: http://localhost:8080/api
- **Database**: MySQL 8.0.44 (transylvania database)
- **Status**: ✅ Running

### Frontend (Next.js + TypeScript)
- **URL**: http://localhost:3000
- **Framework**: Next.js 16 with Turbopack
- **Status**: ✅ Running

---

## 🎯 Quick Demo Flow

### 1. Register a New User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Vampire",
    "email": "john@transylvania.com",
    "password": "password123",
    "role": "USER"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@transylvania.com",
    "password": "password123"
  }'
```

**Save the token from the response!**

### 3. Browse Hotels
```bash
curl http://localhost:8080/api/hotels
```

**Available Hotels:**
1. Castle Dracula (Transylvania, Romania) - $250/night
2. Grand Hotel Budapest (Budapest, Hungary) - $180/night
3. Carpathian Resort (Brasov, Romania) - $150/night
4. Danube Palace (Vienna, Austria) - $220/night
5. Black Sea Resort (Constanta, Romania) - $130/night

### 4. View Hotel Details & Rooms
```bash
curl http://localhost:8080/api/hotels/1
curl http://localhost:8080/api/hotels/1/rooms
```

### 5. Create a Booking
```bash
curl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "roomId": 1,
    "checkInDate": "2025-12-20",
    "checkOutDate": "2025-12-23",
    "numberOfGuests": 2,
    "specialRequests": "Late check-in please"
  }'
```

### 6. View Your Bookings
```bash
curl http://localhost:8080/api/bookings/user \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🖥️ Web UI Demo (Recommended)

### Step 1: Open the Application
Navigate to: **http://localhost:3000**

### Step 2: Register/Login
1. Click "Sign Up" in the navigation bar
2. Create an account with:
   - Name: John Vampire
   - Email: john@transylvania.com
   - Password: password123
3. Or login if you already have an account

### Step 3: Browse Hotels
1. You'll see the home page with all available hotels
2. Use the search bar to filter by location
3. View hotel details, ratings, and amenities

### Step 4: Select a Room
1. Click on any hotel (e.g., "Castle Dracula")
2. View available rooms:
   - Standard Room ($200/night)
   - Deluxe Suite ($360/night)
   - Royal Suite ($675/night)
3. Click "Book Now" on your preferred room

### Step 5: Complete Booking
1. Select check-in and check-out dates
2. Choose number of guests
3. Add any special requests
4. Review the booking summary with total price
5. Click "Confirm Booking"

### Step 6: View Your Bookings
1. Navigate to "Dashboard" in the navigation bar
2. See all your confirmed bookings
3. View booking details, dates, and status

---

## 🧪 Test Scenarios

### Scenario 1: Weekend Getaway at Castle Dracula
```javascript
// Booking Details
Hotel: Castle Dracula
Room: Royal Suite
Check-in: Dec 20, 2025
Check-out: Dec 23, 2025
Guests: 2
Nights: 3
Price: $675/night × 3 = $2,025
```

### Scenario 2: Business Trip to Budapest
```javascript
// Booking Details
Hotel: Grand Hotel Budapest
Room: Deluxe Room
Check-in: Dec 18, 2025
Check-out: Dec 20, 2025
Guests: 1
Nights: 2
Price: $240/night × 2 = $480
```

### Scenario 3: Family Vacation at Carpathian Resort
```javascript
// Booking Details
Hotel: Carpathian Resort
Room: Alpine Suite
Check-in: Dec 25, 2025
Check-out: Dec 30, 2025
Guests: 4
Nights: 5
Price: $420/night × 5 = $2,100
```

---

## 📊 Features Demonstrated

### Backend (Java 21 + Spring Boot)
✅ RESTful API with JWT authentication
✅ MySQL database with JPA/Hibernate
✅ OOP principles (Inheritance, Polymorphism, Encapsulation, Abstraction)
✅ Design patterns (Strategy, Template Method, Factory)
✅ Input validation and error handling
✅ CORS configuration for frontend integration
✅ Secure password hashing with BCrypt

### Frontend (Next.js + TypeScript)
✅ Modern React with Server/Client Components
✅ Type-safe API integration
✅ Responsive UI with Tailwind CSS and shadcn/ui
✅ Authentication flow with JWT
✅ Real-time booking availability
✅ Date picker for check-in/check-out
✅ Dynamic price calculation
✅ User dashboard with booking management

---

## 🔧 Troubleshooting

### Backend Not Responding
```bash
# Check if backend is running
curl http://localhost:8080/api/hotels

# View backend logs
tail -f /tmp/backend.log

# Restart backend
cd ~/projects/Transylvania/backend
pkill -f hotel-booking-system
java -jar target/hotel-booking-system-1.0.0.jar
```

### Frontend Not Loading
```bash
# Check if frontend is running
curl http://localhost:3000

# View frontend logs
tail -f /tmp/frontend.log

# Restart frontend
cd ~/projects/Transylvania/frontend
pkill -f "next dev"
npm run dev
```

### Database Issues
```bash
# Check MySQL status
sudo systemctl status mysql

# Connect to database
sudo mysql -u root

# View data
USE transylvania;
SHOW TABLES;
SELECT * FROM hotels;
SELECT * FROM rooms;
```

---

## 🎉 Demo Script for Presentation

### Introduction (1 min)
"I've built a full-stack hotel booking system using Java 21, Spring Boot, MySQL, and Next.js. This demonstrates modern web development with OOP principles, RESTful APIs, and a responsive frontend."

### Backend Tour (2 min)
1. Show API endpoints working (curl or Postman)
2. Demonstrate authentication (register → login → get token)
3. Show hotel and room data structure
4. Create a test booking via API

### Frontend Demo (3 min)
1. Open http://localhost:3000
2. Register a new user
3. Browse hotels with search functionality
4. View hotel details and available rooms
5. Complete a booking with date selection
6. Show booking confirmation and dashboard

### Architecture Overview (2 min)
1. Java 21 with modern features
2. Spring Boot 3.2 with Spring Security
3. MySQL with JPA/Hibernate
4. JWT authentication
5. Next.js with TypeScript and Tailwind CSS
6. RESTful API design

### Technical Highlights (2 min)
1. OOP: Inheritance (User→Customer, Room→StandardRoom)
2. Design Patterns: Strategy (Payment methods), Template Method
3. Database: Single table inheritance, many-to-many relationships
4. Security: JWT tokens, BCrypt password hashing
5. Frontend: Type-safe API calls, real-time updates

---

## 📝 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Hotels
- `GET /api/hotels` - List all hotels
- `GET /api/hotels/{id}` - Get hotel details
- `GET /api/hotels/{id}/rooms` - Get rooms for hotel

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user's bookings
- `DELETE /api/bookings/{id}` - Cancel booking

---

## 💡 Next Steps

- ✨ Add payment integration
- 📧 Email confirmations
- 🔍 Advanced search filters
- ⭐ Review and rating system
- 📱 Mobile app with React Native
- 🌐 Multi-language support
- 📊 Admin analytics dashboard

---

**Enjoy your demo! 🎉**
