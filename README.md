# 🏰 Transylvania Hotel Booking System

A full-stack hotel booking application demonstrating Object-Oriented Programming principles with Java Spring Boot backend and Next.js frontend.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [OOP Principles Demonstrated](#oop-principles-demonstrated)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Test Credentials](#test-credentials)
- [Database Schema](#database-schema)

---

## ✨ Features

### User Features
- 🔐 User Authentication (Register/Login with JWT)
- 🏨 Browse Hotels with detailed information
- 🛏️ View Room Types (Standard, Deluxe, Suite)
- 📅 Book Rooms with date selection
- 💳 Payment Processing
- 📊 User Dashboard to view bookings

### Admin Features
- 👥 User Management
- 🏨 Hotel Management
- 📈 Booking Analytics

### Technical Features
- RESTful API architecture
- JWT-based authentication
- MySQL database with JPA/Hibernate
- Responsive UI with Tailwind CSS
- Real-time form validation

---

## 🛠️ Tech Stack

### Backend
- **Java 17** - Core language
- **Spring Boot 3.x** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database ORM
- **MySQL** - Database
- **JWT** - Token-based authentication
- **Lombok** - Boilerplate reduction
- **Maven** - Build tool

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **React Hooks** - State management

---

## 🎓 OOP Principles Demonstrated

### 1. **Inheritance**
```java
// Abstract User class with role-based inheritance
User (abstract)
├── Customer
├── Admin
└── HotelManager

Room (abstract)
├── StandardRoom
├── DeluxeRoom
└── SuiteRoom
```

### 2. **Polymorphism**
- **Method Overriding**: Different user types override behavior
- **Runtime Polymorphism**: Factory pattern creates appropriate user types
- **Interface Implementation**: Services implement interface contracts

### 3. **Encapsulation**
- Private fields with public getters/setters
- Business logic encapsulated in service layer
- DTOs separate internal models from API responses

### 4. **Abstraction**
- Abstract User and Room classes
- Service interfaces define contracts
- Repository layer abstracts database operations

### 5. **Design Patterns**
- **Factory Pattern**: User creation based on role
- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: Data transfer objects
- **Dependency Injection**: Constructor-based injection

---

## 📁 Project Structure

```
Transylvania/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/com/transylvania/
│   │   ├── config/            # Security, CORS configuration
│   │   ├── controller/        # REST API endpoints
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── model/            # Entity classes
│   │   │   ├── user/         # User hierarchy (inheritance)
│   │   │   │   ├── User.java (abstract)
│   │   │   │   ├── Customer.java
│   │   │   │   ├── Admin.java
│   │   │   │   └── HotelManager.java
│   │   │   ├── room/         # Room hierarchy (inheritance)
│   │   │   │   ├── Room.java (abstract)
│   │   │   │   ├── StandardRoom.java
│   │   │   │   ├── DeluxeRoom.java
│   │   │   │   └── SuiteRoom.java
│   │   │   ├── Hotel.java
│   │   │   ├── Booking.java
│   │   │   ├── Payment.java
│   │   │   └── Amenity.java
│   │   ├── repository/        # JPA repositories
│   │   ├── security/          # JWT utilities
│   │   └── service/          # Business logic
│   │       ├── interfaces/   # Service contracts
│   │       └── implementations/
│   ├── src/main/resources/
│   │   ├── application.properties  # Configuration
│   │   └── data.sql               # Sample data
│   └── pom.xml                    # Maven dependencies
│
├── frontend/                   # Next.js Frontend
│   ├── app/                   # App router pages
│   │   ├── page.tsx          # Home page
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   ├── hotels/           # Hotel listing & details
│   │   ├── booking/          # Booking flow
│   │   └── dashboard/        # User dashboard
│   ├── components/           # React components
│   │   ├── hotel-card.tsx
│   │   ├── hotel-search.tsx
│   │   ├── navbar.tsx
│   │   └── ui/              # Shadcn components
│   ├── lib/                 # Utilities
│   │   ├── api.ts          # API client
│   │   ├── auth.ts         # Auth utilities
│   │   └── utils.ts        # Helper functions
│   └── package.json        # npm dependencies
│
├── start.sh                 # Start all services script
└── README.md               # This file
```

---

## 📦 Prerequisites

### Required Software
- **Java 17+** - [Download](https://adoptium.net/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)

### Database Setup
```sql
-- Create database
CREATE DATABASE transylvania;

-- Create user
CREATE USER 'transylvania'@'localhost' IDENTIFIED BY 'transylvania123';

-- Grant permissions
GRANT ALL PRIVILEGES ON transylvania.* TO 'transylvania'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🚀 Quick Start

### Option 1: Using the Start Script (Recommended)
```bash
chmod +x start.sh
./start.sh
```
This will:
- Start the backend on port 8080
- Start the frontend on port 3000
- Open your browser automatically

### Option 2: Manual Setup

#### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:3000

---

## 🔑 Test Credentials

### Create New Account
Visit: http://localhost:3000/register

### Sample Test Accounts
You can create accounts with any email/password. Examples:

**Customer Account:**
- Email: `customer@test.com`
- Password: `password123`
- Role: CUSTOMER

**Admin Account:**
- Email: `admin@test.com`
- Password: `admin123`
- Role: ADMIN

**Hotel Manager:**
- Email: `manager@test.com`
- Password: `manager123`
- Role: HOTEL_MANAGER

---

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER"  // Optional: CUSTOMER, ADMIN, HOTEL_MANAGER
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: Same as register
```

### Hotel Endpoints

#### Get All Hotels
```http
GET /api/hotels

Response:
[
  {
    "id": 1,
    "name": "Castle Dracula",
    "location": "Transylvania",
    "description": "...",
    "pricePerNight": 250.0,
    "rating": 4.8,
    "imageUrl": "https://...",
    "amenities": [...],
    "rooms": [...]
  }
]
```

#### Get Hotel by ID
```http
GET /api/hotels/{id}
```

#### Search Hotels
```http
GET /api/hotels/search?location=Budapest&minPrice=100&maxPrice=300
```

### Booking Endpoints

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "hotelId": 1,
  "roomId": 1,
  "checkInDate": "2025-01-01",
  "checkOutDate": "2025-01-05",
  "guests": 2,
  "specialRequests": "Late check-in"
}
```

#### Get User Bookings
```http
GET /api/bookings/user
Authorization: Bearer {token}
```

#### Cancel Booking
```http
PUT /api/bookings/{id}/cancel
Authorization: Bearer {token}
```

---

## 🗄️ Database Schema

### Tables

#### Users
- `id` (PK)
- `user_type` (DISCRIMINATOR)
- `name`
- `email` (UNIQUE)
- `password`
- `role` (ENUM: CUSTOMER, ADMIN, HOTEL_MANAGER)

#### Hotels
- `id` (PK)
- `name`
- `location`
- `description`
- `price_per_night`
- `rating`
- `image_url`
- `city`, `country`, `state`, `street`, `zip_code`

#### Rooms
- `id` (PK)
- `room_type_enum` (DISCRIMINATOR)
- `type`
- `room_type` (ENUM: STANDARD, DELUXE, SUITE)
- `base_price`
- `capacity`
- `description`
- `bed_type`
- `available`
- `image_url`
- `hotel_id` (FK)

#### Bookings
- `id` (PK)
- `hotel_id` (FK)
- `room_id` (FK)
- `user_id` (FK)
- `check_in_date`
- `check_out_date`
- `guests`
- `total_price`
- `status` (ENUM: CONFIRMED, CANCELLED, COMPLETED)
- `special_requests`

#### Payments
- `id` (PK)
- `booking_id` (FK)
- `amount`
- `payment_method`
- `transaction_id`
- `payment_date`
- `status` (ENUM: SUCCESS, FAILED, PENDING)

#### Amenities
- `id` (PK)
- `name`
- `description`
- `available`

#### Hotel_Amenities (Junction Table)
- `hotel_id` (FK)
- `amenity_id` (FK)

---

## 🎯 User Flow: From Browse to Payment

### Step 1: Registration/Login
1. Visit http://localhost:3000
2. Click "Sign Up" or "Log In"
3. Create account or enter credentials
4. System generates JWT token

### Step 2: Browse Hotels
1. View hotel listings on home page
2. Use search filters (location, price range)
3. Click on a hotel card to view details

### Step 3: Select Room
1. View hotel details page
2. Browse available room types
3. Compare prices and amenities
4. Click "Book Now" on desired room

### Step 4: Booking Details
1. Select check-in/check-out dates
2. Enter number of guests
3. Add special requests (optional)
4. Review total price calculation
5. Click "Proceed to Payment"

### Step 5: Payment
1. View booking summary
2. Enter payment details
3. Confirm payment
4. Receive booking confirmation

### Step 6: View Dashboard
1. Navigate to Dashboard
2. View all your bookings
3. Check booking status
4. Cancel bookings if needed

---

## 🏗️ Key Design Decisions

### Why Inheritance for Users and Rooms?
- **Real-world modeling**: Different user types have different behaviors
- **Extensibility**: Easy to add new user types or room types
- **Type safety**: Compile-time type checking for role-specific operations
- **Code reuse**: Shared behavior in abstract base classes

### Why JWT for Authentication?
- **Stateless**: No server-side session storage
- **Scalable**: Works well in distributed systems
- **Secure**: Signed tokens prevent tampering
- **Self-contained**: Token contains all user information

### Why Repository Pattern?
- **Abstraction**: Hide database implementation details
- **Testability**: Easy to mock for unit tests
- **Flexibility**: Can switch database implementations
- **Clean architecture**: Separation of concerns

---

## 🧪 Testing the Application

### Test Hotel Browsing
```bash
curl http://localhost:8080/api/hotels
```

### Test User Registration
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "password": "test123"
  }'
```

### Test Authenticated Endpoint
```bash
curl http://localhost:8080/api/bookings/user \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔧 Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/transylvania
spring.datasource.username=transylvania
spring.datasource.password=transylvania123

# JWT
jwt.secret=YourSecretKey
jwt.expiration=86400000

# Server
server.port=8080
```

### Frontend Configuration
Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

---

## 📝 Sample Data

The application comes with pre-loaded sample data:

### Hotels (5)
- Castle Dracula (Transylvania, Romania)
- Grand Hotel Budapest (Budapest, Hungary)
- Carpathian Resort (Brasov, Romania)
- Danube Palace (Vienna, Austria)
- Black Sea Resort (Constanta, Romania)

### Amenities (8)
- WiFi, Breakfast, Parking, Pool, Spa, Gym, Restaurant, Bar

### Rooms (15)
- 3 room types per hotel (Standard, Deluxe, Suite)

---

## 🚨 Troubleshooting

### Backend won't start
- Check MySQL is running: `sudo systemctl status mysql`
- Verify database credentials in application.properties
- Ensure port 8080 is not in use: `lsof -i :8080`

### Frontend won't start
- Check Node.js version: `node --version` (should be 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Ensure port 3000 is not in use: `lsof -i :3000`

### API returns 403 Forbidden
- Check JWT token is valid
- Verify token is included in Authorization header
- Ensure endpoint doesn't require specific role

### Database connection error
- Verify MySQL is running
- Check database exists: `SHOW DATABASES;`
- Verify user permissions

---

## 📈 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications for bookings
- [ ] Admin panel for hotel management
- [ ] Reviews and ratings system
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced search filters
- [ ] Booking calendar view
- [ ] Price comparison
- [ ] Loyalty program

---

## 👨‍💻 Development

### Adding a New Entity
1. Create model class in `backend/src/main/java/com/transylvania/model/`
2. Create repository interface
3. Create service interface and implementation
4. Create controller with endpoints
5. Add frontend API calls in `frontend/lib/api.ts`
6. Create React components

### Adding a New OOP Concept
Example: Adding Abstract Factory pattern for payment methods:
```java
// 1. Create abstract factory
public abstract class PaymentFactory {
    public abstract Payment createPayment();
}

// 2. Create concrete factories
public class CreditCardPaymentFactory extends PaymentFactory {
    public Payment createPayment() {
        return new CreditCardPayment();
    }
}

// 3. Use in service
Payment payment = paymentFactory.createPayment();
payment.process();
```

---

## 📄 License

This project is for educational purposes demonstrating OOP principles in a full-stack application.

---

## 🙏 Acknowledgments

- Spring Boot Documentation
- Next.js Documentation
- Unsplash for hotel images
- Shadcn/ui for component library

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review API documentation
3. Check browser console for frontend errors
4. Check backend logs for API errors

---

**Built with ❤️ to demonstrate OOP principles in a real-world application**

---

## Quick Commands Reference

```bash
# Start everything
./start.sh

# Backend only
cd backend && mvn spring-boot:run

# Frontend only
cd frontend && npm run dev

# Build backend
cd backend && mvn clean package

# Build frontend
cd frontend && npm run build

# Database reset
mysql -u transylvania -p transylvania < backend/src/main/resources/data.sql
```

---

**Application URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- MySQL: localhost:3306

**Default Ports:**
- Frontend: 3000
- Backend: 8080
- MySQL: 3306
