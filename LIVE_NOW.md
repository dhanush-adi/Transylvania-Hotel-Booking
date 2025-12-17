# 🎉 YOUR SYSTEM IS NOW LIVE!

## ✅ Running Services

### Terminal 1: Backend (Java 21 + Spring Boot + MySQL)
```
Location: /home/cobra/projects/Transylvania/backend
Command: java -jar target/hotel-booking-system-1.0.0.jar
URL: http://localhost:8080
Status: ✅ RUNNING
```

### Terminal 2: Frontend (Next.js + TypeScript)
```
Location: /home/cobra/projects/Transylvania/frontend
Command: npm run dev
URL: http://localhost:3000
Status: ✅ RUNNING
```

---

## 🎬 QUICK DEMO GUIDE

### Option 1: Web Application (EASIEST)

#### 1️⃣ Open Application
**URL**: http://localhost:3000

#### 2️⃣ Register Account
- Click **"Sign Up"** in top navigation
- Enter details:
  - Name: `Your Name`
  - Email: `yourname@hotel.com`
  - Password: `password123`
- Click **"Register"**

#### 3️⃣ Browse Hotels
You'll see 5 hotels:
- 🏰 **Castle Dracula** - $250/night (Transylvania) ⭐4.8
- 🏨 **Grand Hotel Budapest** - $180/night (Budapest) ⭐4.7
- ⛰️ **Carpathian Resort** - $150/night (Brasov) ⭐4.5
- 🏛️ **Danube Palace** - $220/night (Vienna) ⭐4.9
- 🏖️ **Black Sea Resort** - $130/night (Constanta) ⭐4.3

#### 4️⃣ Select Hotel
- Click on **"Castle Dracula"**
- View hotel details, amenities, and rating

#### 5️⃣ Choose Room
Three room types:
- **Standard Room** - $200/night (2 guests)
- **Deluxe Suite** - $360/night (3 guests) ⭐ RECOMMENDED
- **Royal Suite** - $675/night (4 guests)

Click **"Book Now"** on **Deluxe Suite**

#### 6️⃣ Complete Booking
- **Check-in Date**: Click calendar → Select December 20, 2025
- **Check-out Date**: Click calendar → Select December 23, 2025
- **Number of Guests**: Select 2
- **Special Requests**: Type `Late check-in around 10 PM, extra pillows please`

#### 7️⃣ Review & Confirm
Booking Summary:
```
Hotel: Castle Dracula
Room: Deluxe Suite
Check-in: Dec 20, 2025
Check-out: Dec 23, 2025
Nights: 3
Guests: 2
Price per night: $360
Total: $1,080
```

Click **"Confirm Booking"**

#### 8️⃣ Success!
- See booking confirmation message
- Get booking ID
- View booking details

#### 9️⃣ View Dashboard
- Click **"Dashboard"** in navigation
- See your booking listed
- Status: **CONFIRMED** ✅
- View all booking details

---

## 🧪 Test with API (Alternative Method)

### Register New User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API User",
    "email": "api@hotel.com",
    "password": "test123",
    "role": "CUSTOMER"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@hotel.com",
    "password": "test123"
  }'
```
**Save the token!**

### View Hotels
```bash
curl http://localhost:8080/api/hotels
```

### View Castle Dracula Rooms
```bash
curl http://localhost:8080/api/hotels/1/rooms
```

### Create Booking (use your token)
```bash
curl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "roomId": 2,
    "checkInDate": "2025-12-20",
    "checkOutDate": "2025-12-23",
    "numberOfGuests": 2,
    "specialRequests": "Late check-in"
  }'
```

### View Your Bookings
```bash
curl http://localhost:8080/api/bookings/user \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 💡 Suggested Demo Flow

### For Presentation (5 minutes)

**1. Introduction (30 seconds)**
"I've built a full-stack hotel booking system with Java 21 backend and Next.js frontend."

**2. Backend Demo (1 minute)**
- Show API response: `curl http://localhost:8080/api/hotels`
- Point out MySQL database, JWT auth, Spring Boot

**3. Frontend Demo (3 minutes)**
- Open http://localhost:3000
- Register account quickly
- Browse hotels
- Select Castle Dracula
- Book Deluxe Suite for 3 nights
- Show total price calculation ($1,080)
- Complete booking
- Show dashboard with confirmed booking

**4. Technical Highlights (30 seconds)**
- Java 21 with OOP principles
- Spring Security with JWT
- MySQL database
- Next.js with TypeScript
- Responsive UI

---

## 📊 What's Working

✅ User registration and authentication
✅ JWT token-based security
✅ Hotel browsing with search
✅ Room availability checking
✅ Date selection with calendar
✅ Real-time price calculation
✅ Booking creation and confirmation
✅ User dashboard with booking history
✅ Responsive design (mobile, tablet, desktop)
✅ MySQL database with sample data
✅ RESTful API architecture
✅ CORS configured for frontend-backend

---

## 🛑 To Stop Services

### Stop Backend (Terminal 1)
Press `Ctrl+C` in the backend terminal

### Stop Frontend (Terminal 2)
Press `Ctrl+C` in the frontend terminal

---

## 🚀 To Restart

### Restart Backend
```bash
cd /home/cobra/projects/Transylvania/backend
java -jar target/hotel-booking-system-1.0.0.jar
```

### Restart Frontend
```bash
cd /home/cobra/projects/Transylvania/frontend
npm run dev
```

---

## 📝 Sample Test Data

### Test User
- Email: `test@hotel.com`
- Password: `test123`

### Available Hotels (All with sample data)
1. Castle Dracula (ID: 1)
2. Grand Hotel Budapest (ID: 2)
3. Carpathian Resort (ID: 3)
4. Danube Palace (ID: 4)
5. Black Sea Resort (ID: 5)

Each hotel has 3 rooms ready to book!

---

## 🎉 YOU'RE ALL SET!

**The application is live and ready for demo!**

Just open **http://localhost:3000** in your browser and start booking! 🏰

Both terminals are running:
- Backend serving API from MySQL
- Frontend providing beautiful UI
- Full integration working perfectly

**Enjoy your demo!** ✨
