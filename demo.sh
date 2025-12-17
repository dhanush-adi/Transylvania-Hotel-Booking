#!/bin/bash

# Transylvania Hotel Booking System - Demo Script
# This script demonstrates the complete booking flow

set -e

API_BASE="http://localhost:8080/api"
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Transylvania Booking Demo${NC}"
echo -e "${BLUE}================================${NC}\n"

# Step 1: Register a user
echo -e "${YELLOW}Step 1: Registering new user...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "${API_BASE}/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Demo User",
    "email": "demo@transylvania.com",
    "password": "demo123",
    "role": "USER"
  }' 2>/dev/null || echo '{"token":"","message":"User may already exist"}')

TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "${YELLOW}User exists, trying to login...${NC}"
  LOGIN_RESPONSE=$(curl -s -X POST "${API_BASE}/auth/login" \
    -H "Content-Type: application/json" \
    -d '{
      "email": "demo@transylvania.com",
      "password": "demo123"
    }')
  TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
fi

if [ -z "$TOKEN" ]; then
  echo -e "${YELLOW}Could not get token, continuing without auth...${NC}"
  TOKEN="demo-token"
else
  echo -e "${GREEN}✓ Authentication successful${NC}\n"
fi

# Step 2: Browse hotels
echo -e "${YELLOW}Step 2: Browsing available hotels...${NC}"
HOTELS=$(curl -s "${API_BASE}/hotels")
echo "$HOTELS" | jq -r '.[] | "  - \(.name) (\(.location)) - $\(.pricePerNight)/night - Rating: \(.rating)"' 2>/dev/null || echo "Hotels loaded (JSON parser not available)"
echo -e "${GREEN}✓ Found hotels${NC}\n"

# Step 3: View hotel details
echo -e "${YELLOW}Step 3: Viewing Castle Dracula details...${NC}"
HOTEL=$(curl -s "${API_BASE}/hotels/1")
echo "$HOTEL" | jq -r '"Hotel: \(.name)\nLocation: \(.location)\nDescription: \(.description)\nPrice: $\(.pricePerNight)/night\nRating: \(.rating)⭐"' 2>/dev/null || echo "Hotel details loaded"
echo ""

# Step 4: View available rooms
echo -e "${YELLOW}Step 4: Checking available rooms...${NC}"
ROOMS=$(curl -s "${API_BASE}/hotels/1/rooms")
echo "$ROOMS" | jq -r '.[] | "  Room \(.id): \(.type) - $\(.pricePerNight)/night - \(.capacity) guests"' 2>/dev/null || echo "Rooms loaded"
echo -e "${GREEN}✓ Rooms available${NC}\n"

# Step 5: Create a booking
if [ "$TOKEN" != "demo-token" ]; then
  echo -e "${YELLOW}Step 5: Creating a booking...${NC}"
  BOOKING_RESPONSE=$(curl -s -X POST "${API_BASE}/bookings" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${TOKEN}" \
    -d '{
      "roomId": 2,
      "checkInDate": "2025-12-20",
      "checkOutDate": "2025-12-23",
      "numberOfGuests": 2,
      "specialRequests": "Late check-in please, arriving around 10 PM"
    }')
  
  BOOKING_ID=$(echo $BOOKING_RESPONSE | grep -o '"id":[0-9]*' | cut -d':' -f2)
  
  if [ ! -z "$BOOKING_ID" ]; then
    echo -e "${GREEN}✓ Booking created successfully!${NC}"
    echo "$BOOKING_RESPONSE" | jq '.' 2>/dev/null || echo "$BOOKING_RESPONSE"
    echo ""
    
    # Step 6: View user bookings
    echo -e "${YELLOW}Step 6: Viewing all your bookings...${NC}"
    USER_BOOKINGS=$(curl -s "${API_BASE}/bookings/user" \
      -H "Authorization: Bearer ${TOKEN}")
    echo "$USER_BOOKINGS" | jq '.[] | "  Booking #\(.id): \(.hotelName) - \(.roomType) - \(.checkInDate) to \(.checkOutDate) - $\(.totalPrice)"' 2>/dev/null || echo "Bookings retrieved"
    echo -e "${GREEN}✓ Booking history loaded${NC}\n"
  else
    echo -e "${YELLOW}Booking creation skipped or failed${NC}\n"
  fi
else
  echo -e "${YELLOW}Step 5 & 6: Skipped (authentication required)${NC}\n"
fi

# Summary
echo -e "${BLUE}================================${NC}"
echo -e "${GREEN}Demo Complete! 🎉${NC}"
echo -e "${BLUE}================================${NC}\n"
echo -e "Backend API: ${API_BASE}"
echo -e "Frontend UI: http://localhost:3000"
echo -e "\nTo use the web interface:"
echo -e "1. Open http://localhost:3000 in your browser"
echo -e "2. Click 'Sign Up' or 'Login'"
echo -e "3. Browse hotels and make a booking!"
echo -e "\nCredentials for testing:"
echo -e "  Email: demo@transylvania.com"
echo -e "  Password: demo123"
echo ""
