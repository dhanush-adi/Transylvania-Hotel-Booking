#!/bin/bash

# 🏰 Transylvania Hotel Booking System - Startup Script
# This script starts both backend and frontend services in separate terminals

echo "================================================"
echo "🏰 Transylvania Hotel Booking System"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if port is available
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 1
    else
        return 0
    fi
}

echo "📋 Checking prerequisites..."
echo ""

# Check Java
if command_exists java; then
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
    echo -e "${GREEN}✓${NC} Java found (version check: $JAVA_VERSION)"
else
    echo -e "${RED}✗${NC} Java not found. Please install Java 17 or higher."
    exit 1
fi

# Check Maven
if command_exists mvn; then
    echo -e "${GREEN}✓${NC} Maven found"
else
    echo -e "${RED}✗${NC} Maven not found. Please install Maven."
    exit 1
fi

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js found ($NODE_VERSION)"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18 or higher."
    exit 1
fi

# Check npm
if command_exists npm; then
    echo -e "${GREEN}✓${NC} npm found"
else
    echo -e "${RED}✗${NC} npm not found. Please install npm."
    exit 1
fi

# Check MySQL
if command_exists mysql; then
    echo -e "${GREEN}✓${NC} MySQL found"
else
    echo -e "${YELLOW}⚠${NC} MySQL not found. Make sure MySQL is installed and running."
fi

echo ""
echo "🔍 Checking ports..."
echo ""

# Check backend port
if check_port 8080; then
    echo -e "${GREEN}✓${NC} Port 8080 (Backend) is available"
else
    echo -e "${RED}✗${NC} Port 8080 is already in use. Please free up the port."
    echo "   Run: lsof -ti:8080 | xargs kill -9"
    exit 1
fi

# Check frontend port
if check_port 3000; then
    echo -e "${GREEN}✓${NC} Port 3000 (Frontend) is available"
else
    echo -e "${RED}✗${NC} Port 3000 is already in use. Please free up the port."
    echo "   Run: lsof -ti:3000 | xargs kill -9"
    exit 1
fi

echo ""
echo "================================================"
echo "🚀 Starting Services..."
echo "================================================"
echo ""

# Check if backend directory exists
if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "${RED}✗${NC} Backend directory not found at: $BACKEND_DIR"
    exit 1
fi

# Check if frontend directory exists
if [ ! -d "$FRONTEND_DIR" ]; then
    echo -e "${RED}✗${NC} Frontend directory not found at: $FRONTEND_DIR"
    exit 1
fi

# Cleanup function to stop services on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "   ✓ Backend stopped"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "   ✓ Frontend stopped"
    fi
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM EXIT

# Start Backend
echo -e "${BLUE}1/2${NC} Starting Backend (Spring Boot)..."
echo "    Directory: $BACKEND_DIR"
echo "    URL: http://localhost:8080"
echo ""

# Install dependencies if needed
if [ ! -d "$BACKEND_DIR/target" ]; then
    echo "    Installing dependencies..."
    cd "$BACKEND_DIR" && mvn clean install -DskipTests
fi

# Start backend in background
cd "$BACKEND_DIR"
mvn spring-boot:run > /tmp/transylvania-backend.log 2>&1 &
BACKEND_PID=$!

echo -e "${GREEN}✓${NC} Backend starting (PID: $BACKEND_PID)"
echo "    Log: /tmp/transylvania-backend.log"
echo "    Waiting for backend to initialize..."
sleep 15

# Check if backend started successfully
if kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Backend is running!"
else
    echo -e "${RED}✗${NC} Backend failed to start. Check logs at /tmp/transylvania-backend.log"
    exit 1
fi

# Start Frontend
echo ""
echo -e "${BLUE}2/2${NC} Starting Frontend (Next.js)..."
echo "    Directory: $FRONTEND_DIR"
echo "    URL: http://localhost:3000"
echo ""

# Install dependencies if needed
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
    echo "    Installing dependencies..."
    cd "$FRONTEND_DIR" && npm install
fi

# Start frontend in background
cd "$FRONTEND_DIR"
npm run dev > /tmp/transylvania-frontend.log 2>&1 &
FRONTEND_PID=$!

echo -e "${GREEN}✓${NC} Frontend starting (PID: $FRONTEND_PID)"
echo "    Log: /tmp/transylvania-frontend.log"
echo ""

# Wait for services to start
echo "⏳ Waiting for frontend to start..."
sleep 8

# Check if frontend started successfully
if kill -0 $FRONTEND_PID 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Frontend is running!"
else
    echo -e "${RED}✗${NC} Frontend failed to start. Check logs at /tmp/transylvania-frontend.log"
    exit 1
fi

echo ""
echo "================================================"
echo "✅ All Services Started Successfully!"
echo "================================================"
echo ""
echo -e "${GREEN}🌐 Application URLs:${NC}"
echo ""
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:8080"
echo "   API Docs:  http://localhost:8080/api"
echo ""
echo -e "${BLUE}📊 Process IDs:${NC}"
echo ""
echo "   Backend PID:  $BACKEND_PID"
echo "   Frontend PID: $FRONTEND_PID"
echo ""
echo -e "${YELLOW}📖 Quick Guide:${NC}"
echo ""
echo "   1. Register: http://localhost:3000/register"
echo "   2. Login: http://localhost:3000/login"
echo "   3. Browse Hotels: http://localhost:3000/"
echo "   4. Select a hotel and room"
echo "   5. Fill in booking details"
echo "   6. Proceed to payment"
echo ""
echo -e "${BLUE}🔐 Test Credentials:${NC}"
echo ""
echo "   Create any account at registration page, for example:"
echo "   Email: customer@test.com"
echo "   Password: password123"
echo ""
echo -e "${YELLOW}📊 What to Test:${NC}"
echo ""
echo "   ✓ User Registration & Login"
echo "   ✓ Browse Hotels (5 sample hotels)"
echo "   ✓ View Hotel Details"
echo "   ✓ Select Room Type (Standard, Deluxe, Suite)"
echo "   ✓ Create Booking with dates"
echo "   ✓ View Booking Summary"
echo "   ✓ Payment Flow"
echo "   ✓ Dashboard to view bookings"
echo ""
echo -e "${GREEN}🎯 OOP Principles Demonstrated:${NC}"
echo ""
echo "   ✓ Inheritance (User & Room hierarchies)"
echo "   ✓ Polymorphism (Different user/room types)"
echo "   ✓ Encapsulation (Private fields with getters/setters)"
echo "   ✓ Abstraction (Abstract classes and interfaces)"
echo "   ✓ Factory Pattern (User creation)"
echo "   ✓ Repository Pattern (Data access)"
echo ""
echo -e "${BLUE}📝 Logs:${NC}"
echo ""
echo "   Backend:  tail -f /tmp/transylvania-backend.log"
echo "   Frontend: tail -f /tmp/transylvania-frontend.log"
echo ""
echo -e "${RED}🛑 To Stop Services:${NC}"
echo ""
echo "   Press Ctrl+C in this terminal"
echo ""
echo -e "${YELLOW}📚 Documentation:${NC}"
echo ""
echo "   Full documentation available in README.md"
echo ""
echo "================================================"
echo "🏰 Services Running - Press Ctrl+C to Stop"
echo "================================================"
echo ""

# Try to open browser (optional)
if command_exists xdg-open; then
    echo "🌐 Opening browser..."
    xdg-open http://localhost:3000 2>/dev/null &
elif command_exists open; then
    echo "🌐 Opening browser..."
    open http://localhost:3000 2>/dev/null &
fi

echo ""
echo "Monitoring services... (Logs: /tmp/transylvania-*.log)"
echo ""

# Keep script running and monitor services
while true; do
    # Check if backend is still running
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo -e "${RED}✗${NC} Backend stopped unexpectedly!"
        echo "   Check logs: /tmp/transylvania-backend.log"
        break
    fi
    
    # Check if frontend is still running
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo -e "${RED}✗${NC} Frontend stopped unexpectedly!"
        echo "   Check logs: /tmp/transylvania-frontend.log"
        break
    fi
    
    sleep 5
done
