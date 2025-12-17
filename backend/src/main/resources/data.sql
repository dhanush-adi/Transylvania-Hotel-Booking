-- Sample data for Transylvania Hotel Booking System

-- Insert admin user (password: admin123)
INSERT INTO users (user_type, name, email, password, role) VALUES
('ADMIN', 'Admin User', 'admin@transylvania.com', '$2a$10$XPTYZJLKqHqYqJqJqJqJqOeKkKkKkKkKkKkKkKkKkKkKkKkKkKkKk', 'ADMIN');

-- Insert sample hotels
INSERT INTO hotels (name, location, description, price_per_night, rating, image_url, city, country) VALUES
('Castle Dracula', 'Transylvania', 'Experience the legendary castle with gothic architecture and mysterious ambiance', 250.00, 4.8, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80', 'Transylvania', 'Romania'),
('Grand Hotel Budapest', 'Budapest', 'Luxurious hotel in the heart of Budapest with stunning views', 180.00, 4.7, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', 'Budapest', 'Hungary'),
('Carpathian Resort', 'Brasov', 'Mountain resort with breathtaking views of the Carpathian mountains', 150.00, 4.5, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', 'Brasov', 'Romania'),
('Danube Palace', 'Vienna', 'Elegant palace hotel along the beautiful Danube river', 220.00, 4.9, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', 'Vienna', 'Austria'),
('Black Sea Resort', 'Constanta', 'Beachfront resort with modern amenities and sea views', 130.00, 4.3, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', 'Constanta', 'Romania');

-- Insert sample amenities
INSERT INTO amenities (name, description, available) VALUES
('WiFi', 'High-speed wireless internet', true),
('Breakfast', 'Complimentary breakfast buffet', true),
('Parking', 'Free parking for guests', true),
('Pool', 'Indoor swimming pool', true),
('Spa', 'Full-service spa and wellness center', true),
('Gym', 'Fitness center with modern equipment', true),
('Restaurant', 'On-site restaurant', true),
('Bar', 'Cocktail bar and lounge', true);

-- Link amenities to hotels (hotel_amenities junction table)
-- Assuming hotel IDs 1-5 and amenity IDs 1-8
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 5), (1, 7),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 6), (3, 7),
(4, 1), (4, 2), (4, 3), (4, 5), (4, 7), (4, 8),
(5, 1), (5, 2), (5, 3), (5, 4), (5, 6), (5, 7), (5, 8);

-- Insert sample rooms for each hotel
-- Castle Dracula rooms
INSERT INTO rooms (room_type, type, room_type_enum, base_price, capacity, description, bed_type, available, hotel_id, image_url) VALUES
('STANDARD', 'Standard Room', 'STANDARD', 200.00, 2, 'Cozy room with medieval decor', 'Queen Bed', true, 1, 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'),
('DELUXE', 'Deluxe Suite', 'DELUXE', 300.00, 3, 'Spacious suite with castle views', 'King Bed', true, 1, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'),
('SUITE', 'Royal Suite', 'SUITE', 450.00, 4, 'Luxurious suite fit for royalty', 'King Bed + Sofa Bed', true, 1, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80');

-- Grand Hotel Budapest rooms
INSERT INTO rooms (room_type, type, room_type_enum, base_price, capacity, description, bed_type, available, hotel_id, image_url) VALUES
('STANDARD', 'Standard Room', 'STANDARD', 150.00, 2, 'Elegant room with city views', 'Queen Bed', true, 2, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'),
('DELUXE', 'Deluxe Room', 'DELUXE', 200.00, 2, 'Premium room with balcony', 'King Bed', true, 2, 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80'),
('SUITE', 'Presidential Suite', 'SUITE', 350.00, 4, 'Top-floor suite with panoramic views', 'King Bed + Living Area', true, 2, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80');

-- Carpathian Resort rooms
INSERT INTO rooms (room_type, type, room_type_enum, base_price, capacity, description, bed_type, available, hotel_id, image_url) VALUES
('STANDARD', 'Mountain View Room', 'STANDARD', 120.00, 2, 'Room with mountain views', 'Queen Bed', true, 3, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80'),
('DELUXE', 'Deluxe Mountain Suite', 'DELUXE', 180.00, 3, 'Suite with private balcony', 'King Bed', true, 3, 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80'),
('SUITE', 'Alpine Suite', 'SUITE', 280.00, 4, 'Luxury suite with fireplace', 'King Bed + Sofa Bed', true, 3, 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80');

-- Danube Palace rooms
INSERT INTO rooms (room_type, type, room_type_enum, base_price, capacity, description, bed_type, available, hotel_id, image_url) VALUES
('STANDARD', 'Palace Room', 'STANDARD', 180.00, 2, 'Classic palace room', 'Queen Bed', true, 4, 'https://images.unsplash.com/photo-1617859047452-8510bcf207fd?w=800&q=80'),
('DELUXE', 'Deluxe Palace Suite', 'DELUXE', 250.00, 3, 'Elegant suite with river views', 'King Bed', true, 4, 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&q=80'),
('SUITE', 'Imperial Suite', 'SUITE', 400.00, 4, 'Grand suite with antique furnishings', 'King Bed + Living Room', true, 4, 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80');

-- Black Sea Resort rooms
INSERT INTO rooms (room_type, type, room_type_enum, base_price, capacity, description, bed_type, available, hotel_id, image_url) VALUES
('STANDARD', 'Sea View Room', 'STANDARD', 100.00, 2, 'Room with sea views', 'Queen Bed', true, 5, 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80'),
('DELUXE', 'Deluxe Beach Suite', 'DELUXE', 150.00, 3, 'Suite with beach access', 'King Bed', true, 5, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80'),
('SUITE', 'Ocean Suite', 'SUITE', 250.00, 4, 'Luxury suite with private terrace', 'King Bed + Living Area', true, 5, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80');
