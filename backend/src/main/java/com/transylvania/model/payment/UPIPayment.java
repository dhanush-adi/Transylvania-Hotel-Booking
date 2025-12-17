package com.transylvania.model.payment;

import lombok.extern.slf4j.Slf4j;

/**
 * UPI Payment implementation
 * 
 * OOP Principles Demonstrated:
 * 1. INTERFACE IMPLEMENTATION - Implements PaymentMethod interface
 * 2. POLYMORPHISM - Can be used wherever PaymentMethod is expected
 * 3. ENCAPSULATION - Payment processing logic encapsulated
 */
@Slf4j
public class UPIPayment implements PaymentMethod {
    
    private String upiId;
    private String userName;
    
    public UPIPayment(String upiId, String userName) {
        this.upiId = upiId;
        this.userName = userName;
    }
    
    /**
     * Simulates UPI payment processing
     * Demonstrates ENCAPSULATION of payment logic
     * 
     * @param amount Amount to charge
     * @return Payment status
     */
    @Override
    public PaymentStatus processPayment(double amount) {
        log.info("Processing UPI payment of ${} for {} ({})", amount, userName, upiId);
        
        // Simulate payment processing
        try {
            Thread.sleep(800); // Simulate network delay (faster than card)
            
            // Simulate 97% success rate (UPI typically more reliable)
            if (Math.random() < 0.97) {
                log.info("UPI payment successful");
                return PaymentStatus.SUCCESS;
            } else {
                log.warn("UPI payment failed");
                return PaymentStatus.FAILED;
            }
        } catch (InterruptedException e) {
            log.error("Payment processing interrupted", e);
            return PaymentStatus.FAILED;
        }
    }
    
    /**
     * Simulates UPI payment refund
     * 
     * @param amount Amount to refund
     * @return true if successful
     */
    @Override
    public boolean refund(double amount) {
        log.info("Processing refund of ${} to UPI ID: {}", amount, upiId);
        // Simulate refund processing
        return true;
    }
    
    @Override
    public String getPaymentMethodName() {
        return "UPI Payment";
    }
    
    /**
     * Validates UPI ID format
     * Demonstrates ENCAPSULATION of validation logic
     * 
     * @return true if UPI ID is valid
     */
    public boolean isValidUpiId() {
        return upiId != null && upiId.contains("@");
    }
}
