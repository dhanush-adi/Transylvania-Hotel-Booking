package com.transylvania.repository;

import com.transylvania.model.payment.Payment;
import com.transylvania.model.payment.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Payment entity
 */
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    /**
     * Find payment by booking ID
     * 
     * @param bookingId Booking ID
     * @return Optional containing payment if found
     */
    @Query("SELECT p FROM Payment p WHERE p.booking.id = :bookingId")
    Optional<Payment> findByBookingId(@Param("bookingId") Long bookingId);
    
    /**
     * Find payments by status
     * 
     * @param status Payment status
     * @return List of payments with specified status
     */
    List<Payment> findByStatus(PaymentStatus status);
    
    /**
     * Find payment by transaction ID
     * 
     * @param transactionId Transaction ID
     * @return Optional containing payment if found
     */
    Optional<Payment> findByTransactionId(String transactionId);
}
