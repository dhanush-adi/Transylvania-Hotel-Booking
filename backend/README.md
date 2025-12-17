# Transylvania Hotel Booking System - Backend

## Overview
This is the backend for the Transylvania Hotel Booking System, built with **Java Spring Boot** and demonstrating strong **Object-Oriented Programming (OOP)** principles.

## OOP Principles Demonstrated

### 1. **Inheritance**
- `User` → `Customer`, `Admin`, `HotelManager`
- `Room` → `StandardRoom`, `DeluxeRoom`, `SuiteRoom`

### 2. **Polymorphism**
- Room pricing: Each room type implements `calculatePrice()` differently
- Payment methods: `CardPayment` and `UPIPayment` implement `PaymentMethod` interface
- User creation: Factory pattern creates different user types based on role

### 3. **Encapsulation**
- All entities use private fields with getters/setters
- Business logic encapsulated in service layer
- Validation logic within entity classes

### 4. **Abstraction**
- Abstract `User` class with abstract method `getRolePermissions()`
- Abstract `Room` class with abstract method `calculatePrice()`
- `PaymentMethod` interface defining payment contract

### 5. **Composition**
- `Hotel` HAS-A `Address` (embedded)
- `Hotel` HAS-MANY `Amenities`
- `Booking` HAS-A `Payment`

### 6. **Interfaces**
- Service layer uses interface + implementation pattern
- `PaymentMethod` interface for different payment types

## Tech Stack
- **Java 17**
- **Spring Boot 3.2.1**
- **PostgreSQL** (Database)
- **JPA/Hibernate** (ORM)
- **JWT** (Authentication)
- **BCrypt** (Password Hashing)
- **Maven** (Build Tool)
- **Lombok** (Boilerplate Reduction)

## Project Structure
```
src/main/java/com/transylvania/
├── model/              # Domain entities (OOP models)
│   ├── user/          # User hierarchy
│   ├── hotel/         # Hotel and Address
│   ├── room/          # Room hierarchy
│   ├── booking/       # Booking entity
│   └── payment/       # Payment entities and interfaces
├── repository/        # JPA repositories
├── service/           # Business logic layer
│   ├── interfaces/    # Service interfaces
│   └── implementations/ # Service implementations
├── controller/        # REST API controllers
├── dto/              # Data Transfer Objects
├── exception/        # Custom exceptions
├── security/         # JWT utilities
└── config/           # Spring configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Hotels
- `GET /api/hotels` - Get all hotels (with optional filters)
- `GET /api/hotels/{id}` - Get hotel by ID
- `POST /api/hotels` - Create hotel (Admin/Manager)
- `PUT /api/hotels/{id}` - Update hotel (Admin/Manager)

### Rooms
- `GET /api/hotels/{hotelId}/rooms` - Get rooms for a hotel
- `POST /api/hotels/{hotelId}/rooms` - Create room (Admin/Manager)

### Bookings
- `POST /api/bookings` - Create booking (Authenticated)
- `GET /api/bookings/user` - Get user's bookings
- `GET /api/bookings/all` - Get all bookings (Admin)
- `DELETE /api/bookings/{id}` - Cancel booking

## Setup Instructions

### Prerequisites
- Java 17 or higher
- PostgreSQL database
- Maven

### Database Setup
```bash
# Using Docker
docker run --name transylvania-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=transylvania \
  -p 5432:5432 -d postgres:15
```

### Run Application
```bash
# Build
mvn clean install

# Run
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## Key Features

### Double-Booking Prevention
The `BookingService` checks for conflicting bookings before creating a new booking:
```java
List<Booking> conflicts = bookingRepository.findConflictingBookings(
    roomId, checkInDate, checkOutDate
);
```

### Polymorphic Room Pricing
Each room type calculates its price differently:
- **StandardRoom**: Base price × nights
- **DeluxeRoom**: Base price × 1.20 × nights (20% premium)
- **SuiteRoom**: Base price × 1.50 × nights (50% premium)

### Payment Simulation
The system simulates payment processing using the `PaymentMethod` interface:
- `CardPayment`: 95% success rate
- `UPIPayment`: 97% success rate

## Default Credentials
- **Admin**: admin@transylvania.com / admin123

## Sample Data
The application includes sample data with:
- 5 hotels across different locations
- 3 room types per hotel (Standard, Deluxe, Suite)
- Various amenities (WiFi, Breakfast, Pool, Spa, etc.)

## CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:3001`

## License
MIT
