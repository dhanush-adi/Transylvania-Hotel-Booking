package com.transylvania.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for creating a booking
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    
    @NotNull(message = "Hotel ID is required")
    private Long hotelId;
    
    @NotNull(message = "Room ID is required")
    private Long roomId;
    
    @NotNull(message = "Check-in date is required")
    private LocalDate checkInDate;
    
    @NotNull(message = "Check-out date is required")
    private LocalDate checkOutDate;
    
    @NotNull(message = "Number of guests is required")
    @Positive(message = "Number of guests must be positive")
    private Integer guests;
    
    private String specialRequests;
    
    @NotNull(message = "Total price is required")
    @Positive(message = "Total price must be positive")
    private Double totalPrice;
}
