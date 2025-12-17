package com.transylvania.model.booking;

import com.transylvania.model.hotel.Hotel;
import com.transylvania.model.payment.Payment;
import com.transylvania.model.room.Room;
import com.transylvania.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/**
 * Booking entity
 * 
 * OOP Principles Demonstrated:
 * 1. ENCAPSULATION - Private fields with getters/setters
 * 2. ASSOCIATION - Relationships with User, Hotel, Room, Payment
 * 3. Business logic encapsulated in methods
 */
@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /**
     * ASSOCIATION: Booking belongs to User
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    /**
     * ASSOCIATION: Booking belongs to Hotel
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;
    
    /**
     * ASSOCIATION: Booking belongs to Room
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
    
    @Column(nullable = false)
    private LocalDate checkInDate;
    
    @Column(nullable = false)
    private LocalDate checkOutDate;
    
    @Column(nullable = false)
    private Integer guests;
    
    @Column(length = 1000)
    private String specialRequests;
    
    @Column(nullable = false)
    private Double totalPrice;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.CONFIRMED;
    
    /**
     * ASSOCIATION: Booking has one Payment
     */
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private Payment payment;
    
    /**
     * Validates booking dates
     * Demonstrates ENCAPSULATION of validation logic
     * 
     * @return true if dates are valid
     */
    public boolean isValidDateRange() {
        if (checkInDate == null || checkOutDate == null) {
            return false;
        }
        return checkOutDate.isAfter(checkInDate);
    }
    
    /**
     * Calculates number of nights
     * Demonstrates ENCAPSULATION of business logic
     * 
     * @return Number of nights
     */
    public long getNumberOfNights() {
        if (checkInDate == null || checkOutDate == null) {
            return 0;
        }
        return ChronoUnit.DAYS.between(checkInDate, checkOutDate);
    }
    
    /**
     * Checks if booking can be cancelled
     * Demonstrates ENCAPSULATION of business rules
     * 
     * @return true if booking can be cancelled
     */
    public boolean isCancellable() {
        return status == BookingStatus.CONFIRMED && 
               checkInDate.isAfter(LocalDate.now());
    }
    
    /**
     * Cancels the booking
     * Demonstrates ENCAPSULATION of state management
     */
    public void cancel() {
        if (isCancellable()) {
            this.status = BookingStatus.CANCELLED;
        } else {
            throw new IllegalStateException("Booking cannot be cancelled");
        }
    }
    
    /**
     * Checks if booking is active
     * Demonstrates ENCAPSULATION
     * 
     * @return true if booking is currently active
     */
    public boolean isActive() {
        LocalDate now = LocalDate.now();
        return status == BookingStatus.CONFIRMED &&
               !checkInDate.isAfter(now) &&
               !checkOutDate.isBefore(now);
    }
}
