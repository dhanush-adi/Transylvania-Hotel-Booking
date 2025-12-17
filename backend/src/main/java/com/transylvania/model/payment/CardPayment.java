package com.transylvania.model.payment;

import lombok.extern.slf4j.Slf4j;

/**
 * Card Payment implementation
 * 
 * OOP Principles Demonstrated:
 * 1. INTERFACE IMPLEMENTATION - Implements PaymentMethod interface
 * 2. POLYMORPHISM - Can be used wherever PaymentMethod is expected
 * 3. ENCAPSULATION - Payment processing logic encapsulated
 */
@Slf4j
public class CardPayment implements PaymentMethod {
    
    private String cardNumber;
    private String cardHolderName;
    @SuppressWarnings("unused")
    private String expiryDate;
    @SuppressWarnings("unused")
    private String cvv;
    
    public CardPayment(String cardNumber, String cardHolderName, String expiryDate, String cvv) {
        this.cardNumber = maskCardNumber(cardNumber);
        this.cardHolderName = cardHolderName;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
    }
    
    /**
     * Simulates card payment processing
     * Demonstrates ENCAPSULATION of payment logic
     * 
     * @param amount Amount to charge
     * @return Payment status
     */
    @Override
    public PaymentStatus processPayment(double amount) {
        log.info("Processing card payment of ${} for {}", amount, cardHolderName);
        
        // Simulate payment processing
        try {
            Thread.sleep(1000); // Simulate network delay
            
            // Simulate 95% success rate
            if (Math.random() < 0.95) {
                log.info("Card payment successful");
                return PaymentStatus.SUCCESS;
            } else {
                log.warn("Card payment failed");
                return PaymentStatus.FAILED;
            }
        } catch (InterruptedException e) {
            log.error("Payment processing interrupted", e);
            return PaymentStatus.FAILED;
        }
    }
    
    /**
     * Simulates card payment refund
     * 
     * @param amount Amount to refund
     * @return true if successful
     */
    @Override
    public boolean refund(double amount) {
        log.info("Processing refund of ${} to card ending in {}", 
            amount, cardNumber.substring(cardNumber.length() - 4));
        // Simulate refund processing
        return true;
    }
    
    @Override
    public String getPaymentMethodName() {
        return "Card Payment";
    }
    
    /**
     * Masks card number for security
     * Demonstrates ENCAPSULATION of security logic
     * 
     * @param cardNumber Original card number
     * @return Masked card number
     */
    private String maskCardNumber(String cardNumber) {
        if (cardNumber == null || cardNumber.length() < 4) {
            return "****";
        }
        return "**** **** **** " + cardNumber.substring(cardNumber.length() - 4);
    }
}
