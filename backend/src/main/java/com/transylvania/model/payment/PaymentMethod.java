package com.transylvania.model.payment;

/**
 * Interface for payment methods
 * 
 * OOP Principles Demonstrated:
 * 1. ABSTRACTION - Interface defining payment contract
 * 2. POLYMORPHISM - Different implementations (CardPayment, UPIPayment)
 * 
 * This interface allows different payment methods to be used interchangeably
 */
public interface PaymentMethod {
    
    /**
     * Process a payment
     * 
     * @param amount Amount to charge
     * @return Payment status after processing
     */
    PaymentStatus processPayment(double amount);
    
    /**
     * Refund a payment
     * 
     * @param amount Amount to refund
     * @return true if refund successful
     */
    boolean refund(double amount);
    
    /**
     * Get payment method name
     * 
     * @return Name of the payment method
     */
    String getPaymentMethodName();
}
