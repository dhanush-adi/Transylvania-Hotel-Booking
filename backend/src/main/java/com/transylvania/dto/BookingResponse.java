package com.transylvania.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for booking response
 * Matches frontend expectations
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    
    private Long id;
    private Long hotelId;
    private String hotelName;
    private String location;
    private Long roomId;
    private String roomType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer guests;
    private String specialRequests;
    private Double totalPrice;
    private String status;
}
