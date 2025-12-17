package com.transylvania.controller;

import com.transylvania.dto.BookingRequest;
import com.transylvania.dto.BookingResponse;
import com.transylvania.security.JwtUtil;
import com.transylvania.service.interfaces.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for booking endpoints
 */
@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookingController {
    
    private final BookingService bookingService;
    private final JwtUtil jwtUtil;
    
    /**
     * Create new booking
     * POST /api/bookings
     */
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody BookingRequest request,
            @RequestHeader("Authorization") String authHeader) {
        
        Long userId = extractUserIdFromToken(authHeader);
        BookingResponse response = bookingService.createBooking(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    /**
     * Get current user's bookings
     * GET /api/bookings/user
     */
    @GetMapping("/user")
    public ResponseEntity<List<BookingResponse>> getUserBookings(
            @RequestHeader("Authorization") String authHeader) {
        
        Long userId = extractUserIdFromToken(authHeader);
        List<BookingResponse> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(bookings);
    }
    
    /**
     * Get all bookings (Admin only)
     * GET /api/bookings/all
     */
    @GetMapping("/all")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookingResponse> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
    
    /**
     * Cancel booking
     * DELETE /api/bookings/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
        
        Long userId = extractUserIdFromToken(authHeader);
        bookingService.cancelBooking(id, userId);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * Extract user ID from JWT token
     */
    private Long extractUserIdFromToken(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return jwtUtil.extractUserId(token);
    }
}
