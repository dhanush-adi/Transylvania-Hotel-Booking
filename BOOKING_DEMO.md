# 🎉 Transylvania Hotel Booking System - Integration Complete!

## ✅ What's Been Integrated

### Backend (Java 21 + Spring Boot + MySQL)
- **Upgraded to Java 21** ✅
- **Migrated from PostgreSQL to MySQL** ✅
- **Fixed JWT API compatibility** ✅
- **RESTful API running on port 8080** ✅
- **Sample data loaded** (5 hotels, 15 rooms, amenities) ✅

### Frontend (Next.js + TypeScript)
- **Running on port 3000** ✅
- **Connected to backend API** ✅
- **Authentication system integrated** ✅
- **Booking interface ready** ✅

---

## 🚀 Live Demo - Both Systems Running!

### Backend API
**Base URL**: `http://localhost:8080/api`

**Test it:**
```bash
curl http://localhost:8080/api/hotels
```

### Frontend Web App
**URL**: `http://localhost:3000`

**Open in your browser** to see the full UI!

---

## 📋 Complete Booking Demo

### Option 1: Web Interface (Recommended)

#### Step 1: Access the Application
Open your browser and navigate to: **http://localhost:3000**

#### Step 2: Create an Account
1. Click **"Sign Up"** button in the top navigation
2. Fill in your details:
   - **Name**: Your Name
   - **Email**: your.email@example.com
   - **Password**: yourpassword
3. Click **"Register"**

#### Step 3: Browse Hotels
- You'll see 5 beautiful hotels:
  1. **Castle Dracula** 🏰 (Transylvania, Romania) - $250/night ⭐4.8
  2. **Grand Hotel Budapest** 🏨 (Budapest, Hungary) - $180/night ⭐4.7
  3. **Carpathian Resort** ⛰️ (Brasov, Romania) - $150/night ⭐4.5
  4. **Danube Palace** 🏛️ (Vienna, Austria) - $220/night ⭐4.9
  5. **Black Sea Resort** 🏖️ (Constanta, Romania) - $130/night ⭐4.3

#### Step 4: View Hotel Details
Click on any hotel card to see:
- Full description
- Available amenities (WiFi, Pool, Spa, etc.)
- Room options with prices
- Photos and ratings

#### Step 5: Select a Room
Each hotel has 3 room types:
- **Standard Room** - Budget-friendly option
- **Deluxe Room/Suite** - Premium with extras
- **Suite/Royal Suite** - Luxury experience

Click **"Book Now"** on your preferred room

#### Step 6: Complete Your Booking
1. **Select Check-in Date** using the calendar picker
2. **Select Check-out Date**
3. **Choose Number of Guests** (1-4)
4. **Add Special Requests** (optional)
   - Example: "Late check-in", "Extra pillows", "High floor please"
5. **Review Booking Summary**:
   - Room details
   - Dates
   - Number of nights
   - **Total Price** (calculated automatically)
6. Click **"Confirm Booking"**

#### Step 7: View Your Bookings
- Navigate to **"Dashboard"** in the top menu
- See all your confirmed bookings
- View booking details, status, and dates
- Option to cancel if needed

---

### Option 2: API Testing (For Developers)

#### Test User Credentials
```
Email: test@hotel.com
Password: test123
```

#### 1. Login via API
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@hotel.com",
    "password": "test123"
  }'
```

**Save the token from the response!**

#### 2. Browse Hotels
```bash
curl http://localhost:8080/api/hotels
```

#### 3. View Specific Hotel
```bash
# Castle Dracula
curl http://localhost:8080/api/hotels/1
```

#### 4. View Available Rooms
```bash
curl http://localhost:8080/api/hotels/1/rooms
```

**Sample Response:**
```json
[
  {
    "id": 1,
    "type": "Standard Room",
    "roomType": "STANDARD",
    "basePrice": 200.0,
    "pricePerNight": 200.0,
    "capacity": 2,
    "bedType": "Queen Bed",
    "available": true
  },
  {
    "id": 2,
    "type": "Deluxe Suite",
    "roomType": "DELUXE",
    "basePrice": 300.0,
    "pricePerNight": 360.0,
    "capacity": 3,
    "bedType": "King Bed",
    "available": true
  },
  {
    "id": 3,
    "type": "Royal Suite",
    "roomType": "SUITE",
    "basePrice": 450.0,
    "pricePerNight": 675.0,
    "capacity": 4,
    "bedType": "King Bed + Sofa Bed",
    "available": true
  }
]
```

#### 5. Create a Booking
```bash
curl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "roomId": 2,
    "checkInDate": "2025-12-25",
    "checkOutDate": "2025-12-28",
    "numberOfGuests": 2,
    "specialRequests": "Late check-in around 10 PM, extra pillows please"
  }'
```

#### 6. View Your Bookings
```bash
curl http://localhost:8080/api/bookings/user \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎬 Quick Demo Scenarios

### Scenario 1: Romantic Weekend at Castle Dracula 🏰
```
Hotel: Castle Dracula
Room: Royal Suite
Dates: Dec 20-23, 2025 (3 nights)
Guests: 2
Special Request: "Champagne and roses in room"
Total: $675/night × 3 = $2,025
```

### Scenario 2: Business Trip to Budapest 🏨
```
Hotel: Grand Hotel Budapest
Room: Deluxe Room
Dates: Dec 18-20, 2025 (2 nights)
Guests: 1
Special Request: "Need workspace and strong WiFi"
Total: $240/night × 2 = $480
```

### Scenario 3: Family Vacation in the Carpathians ⛰️
```
Hotel: Carpathian Resort
Room: Alpine Suite
Dates: Dec 25-30, 2025 (5 nights)
Guests: 4
Special Request: "Kid-friendly room, connecting rooms if possible"
Total: $420/night × 5 = $2,100
```

---

## 🎨 Frontend Features

### ✨ Beautiful UI Components
- Modern design with Tailwind CSS
- Responsive layout (works on mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Professional shadcn/ui components

### 🔐 Authentication
- Secure JWT-based auth
- Protected routes
- Persistent login (localStorage)
- Automatic token refresh

### 📅 Booking Interface
- Interactive date picker calendar
- Real-time price calculation
- Guest number selector
- Special requests textarea
- Booking confirmation modal

### 📊 User Dashboard
- View all bookings
- Booking status indicators
- Details for each reservation
- Cancel booking option

---

## 🔧 Technical Stack

### Backend
- ☕ Java 21 (Latest LTS)
- 🍃 Spring Boot 3.2.1
- 🔐 Spring Security with JWT
- 🗄️ MySQL 8.0.44
- 🔄 JPA/Hibernate ORM
- 📝 Lombok for boilerplate
- ✅ Bean Validation

### Frontend
- ⚛️ Next.js 16 (React 19)
- 📘 TypeScript
- 🎨 Tailwind CSS
- 🧩 shadcn/ui components
- 📅 date-fns for dates
- 🎭 Framer Motion
- 🌐 Axios for API calls

### Database
- 🗄️ MySQL 8.0.44
- 📊 5 Hotels with full details
- 🏠 15 Rooms (3 per hotel)
- ✨ 8 Amenity types
- 👤 User authentication system

---

## 📊 Sample Data Loaded

### Hotels
1. **Castle Dracula** - Gothic castle in Transylvania
   - Amenities: WiFi, Breakfast, Parking, Spa, Restaurant
   - 3 Rooms: Standard ($200), Deluxe ($360), Royal Suite ($675)

2. **Grand Hotel Budapest** - Luxury hotel in Budapest
   - Amenities: All 8 amenities
   - 3 Rooms: Standard ($150), Deluxe ($240), Presidential ($525)

3. **Carpathian Resort** - Mountain resort
   - Amenities: WiFi, Breakfast, Parking, Pool, Gym, Restaurant
   - 3 Rooms: Mountain View ($120), Deluxe Mountain ($216), Alpine Suite ($420)

4. **Danube Palace** - Elegant palace hotel
   - Amenities: WiFi, Breakfast, Parking, Spa, Restaurant, Bar
   - 3 Rooms: Palace ($180), Deluxe Palace ($300), Imperial ($600)

5. **Black Sea Resort** - Beachfront resort
   - Amenities: All 8 amenities
   - 3 Rooms: Sea View ($100), Deluxe Beach ($180), Ocean Suite ($375)

---

## 🎯 What's Working

✅ Backend API fully functional on port 8080
✅ Frontend UI running on port 3000
✅ User registration and login
✅ Hotel browsing and search
✅ Room availability checking
✅ Booking creation and management
✅ JWT authentication
✅ MySQL database with sample data
✅ CORS configured for frontend-backend communication
✅ Responsive UI design
✅ Real-time price calculations

---

## 🚀 How to Use Right Now

### Quick Start
1. **Open your browser**: `http://localhost:3000`
2. **Sign up** with any email and password
3. **Browse hotels** on the home page
4. **Click a hotel** to see rooms
5. **Click "Book Now"** on any room
6. **Select dates** and complete booking
7. **View your booking** in the Dashboard

### For Testing
- Email: `test@hotel.com`
- Password: `test123`
- This account is already created and ready to use!

---

## 💡 Tips for Demo

1. **Show the Home Page First** - Beautiful hotel cards with ratings
2. **Click on Castle Dracula** - Most impressive hotel
3. **Show the Royal Suite** - Highest tier room
4. **Book for 3-5 nights** - Shows good total price
5. **Add special requests** - "Late check-in, extra pillows"
6. **Show the Dashboard** - Professional booking management

---

## 🎉 Demo is Ready!

Both systems are **live and integrated**:
- Backend serving data from MySQL
- Frontend consuming APIs and displaying beautifully
- Full booking flow working end-to-end
- Authentication protecting user data

**Just open `http://localhost:3000` and start booking!** 🏰✨
