package com.transylvania.service.interfaces;

import com.transylvania.dto.BookingRequest;
import com.transylvania.dto.BookingResponse;

import java.util.List;

/**
 * Service interface for booking operations
 */
public interface BookingService {
    
    BookingResponse createBooking(BookingRequest request, Long userId);
    
    List<BookingResponse> getUserBookings(Long userId);
    
    List<BookingResponse> getAllBookings();
    
    void cancelBooking(Long bookingId, Long userId);
}
