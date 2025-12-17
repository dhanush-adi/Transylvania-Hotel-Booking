package com.transylvania.model.payment;

import com.transylvania.model.booking.Booking;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Payment entity
 * 
 * OOP Principles Demonstrated:
 * 1. ENCAPSULATION - Private fields with getters/setters
 * 2. ASSOCIATION - One-to-One relationship with Booking
 */
@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /**
     * ASSOCIATION: Payment belongs to Booking
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;
    
    @Column(nullable = false)
    private Double amount;
    
    @Column(nullable = false)
    private String paymentMethod; // "CARD" or "UPI"
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status = PaymentStatus.PENDING;
    
    @Column(nullable = false)
    private LocalDateTime paymentDate = LocalDateTime.now();
    
    private String transactionId;
    
    /**
     * Checks if payment was successful
     * Demonstrates ENCAPSULATION
     * 
     * @return true if payment successful
     */
    public boolean isSuccessful() {
        return status == PaymentStatus.SUCCESS;
    }
    
    /**
     * Checks if payment failed
     * Demonstrates ENCAPSULATION
     * 
     * @return true if payment failed
     */
    public boolean isFailed() {
        return status == PaymentStatus.FAILED;
    }
    
    /**
     * Checks if payment is pending
     * Demonstrates ENCAPSULATION
     * 
     * @return true if payment pending
     */
    public boolean isPending() {
        return status == PaymentStatus.PENDING;
    }
    
    /**
     * Generates transaction ID
     * Demonstrates ENCAPSULATION of ID generation logic
     * 
     * @return Generated transaction ID
     */
    public static String generateTransactionId() {
        return "TXN" + System.currentTimeMillis() + 
               (int)(Math.random() * 10000);
    }
}
