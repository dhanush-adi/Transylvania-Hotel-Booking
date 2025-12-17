package com.transylvania.service.implementations;

import com.transylvania.dto.BookingRequest;
import com.transylvania.dto.BookingResponse;
import com.transylvania.exception.BookingConflictException;
import com.transylvania.exception.ResourceNotFoundException;
import com.transylvania.model.booking.Booking;
import com.transylvania.model.booking.BookingStatus;
import com.transylvania.model.hotel.Hotel;
import com.transylvania.model.payment.CardPayment;
import com.transylvania.model.payment.Payment;
import com.transylvania.model.payment.PaymentMethod;
import com.transylvania.model.payment.PaymentStatus;
import com.transylvania.model.room.Room;
import com.transylvania.model.user.User;
import com.transylvania.repository.BookingRepository;
import com.transylvania.repository.HotelRepository;
import com.transylvania.repository.RoomRepository;
import com.transylvania.repository.UserRepository;
import com.transylvania.service.interfaces.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of BookingService
 * Demonstrates double-booking prevention and payment processing
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class BookingServiceImpl implements BookingService {
    
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    
    /**
     * Create booking with double-booking prevention
     */
    @Override
    @Transactional
    public BookingResponse createBooking(BookingRequest request, Long userId) {
        log.info("Creating booking for user: {}", userId);
        
        // Validate user
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        // Validate hotel
        Hotel hotel = hotelRepository.findById(request.getHotelId())
            .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", request.getHotelId()));
        
        // Validate room
        Room room = roomRepository.findById(request.getRoomId())
            .orElseThrow(() -> new ResourceNotFoundException("Room", "id", request.getRoomId()));
        
        // Check for conflicting bookings (DOUBLE-BOOKING PREVENTION)
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
            request.getRoomId(),
            request.getCheckInDate(),
            request.getCheckOutDate()
        );
        
        if (!conflicts.isEmpty()) {
            throw new BookingConflictException(
                "Room is not available for the selected dates. Please choose different dates.");
        }
        
        // Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setHotel(hotel);
        booking.setRoom(room);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setGuests(request.getGuests());
        booking.setSpecialRequests(request.getSpecialRequests());
        booking.setTotalPrice(request.getTotalPrice());
        booking.setStatus(BookingStatus.CONFIRMED);
        
        // Process payment (POLYMORPHISM - using PaymentMethod interface)
        Payment payment = processPayment(booking, request.getTotalPrice());
        booking.setPayment(payment);
        
        // Save booking
        booking = bookingRepository.save(booking);
        
        log.info("Booking created successfully: {}", booking.getId());
        return mapToBookingResponse(booking);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getUserBookings(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream()
            .map(this::mapToBookingResponse)
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAllOrderByCheckInDateDesc();
        return bookings.stream()
            .map(this::mapToBookingResponse)
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional
    public void cancelBooking(Long bookingId, Long userId) {
        log.info("Cancelling booking: {}", bookingId);
        
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));
        
        // Verify user owns this booking
        if (!booking.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("You can only cancel your own bookings");
        }
        
        // Cancel booking (uses encapsulated business logic)
        booking.cancel();
        bookingRepository.save(booking);
        
        log.info("Booking cancelled successfully: {}", bookingId);
    }
    
    /**
     * Process payment using PaymentMethod interface
     * Demonstrates POLYMORPHISM
     */
    private Payment processPayment(Booking booking, Double amount) {
        // Create payment method (simulated card payment)
        PaymentMethod paymentMethod = new CardPayment(
            "4111111111111111",
            "Customer",
            "12/25",
            "123"
        );
        
        // Process payment
        PaymentStatus status = paymentMethod.processPayment(amount);
        
        // Create payment record
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(amount);
        payment.setPaymentMethod("CARD");
        payment.setStatus(status);
        payment.setTransactionId(Payment.generateTransactionId());
        
        return payment;
    }
    
    /**
     * Map Booking entity to BookingResponse DTO
     */
    private BookingResponse mapToBookingResponse(Booking booking) {
        return new BookingResponse(
            booking.getId(),
            booking.getHotel().getId(),
            booking.getHotel().getName(),
            booking.getHotel().getLocation(),
            booking.getRoom().getId(),
            booking.getRoom().getType(),
            booking.getCheckInDate(),
            booking.getCheckOutDate(),
            booking.getGuests(),
            booking.getSpecialRequests(),
            booking.getTotalPrice(),
            booking.getStatus().name()
        );
    }
}
