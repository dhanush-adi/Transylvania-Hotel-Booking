package com.transylvania.model.room;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

/**
 * Standard Room type - extends Room
 * 
 * OOP Principles Demonstrated:
 * 1. INHERITANCE - Extends abstract Room class
 * 2. POLYMORPHISM - Implements abstract method with standard pricing (no markup)
 */
@Entity
@DiscriminatorValue("STANDARD")
@NoArgsConstructor
public class StandardRoom extends Room {
    
    /**
     * Implements abstract method from Room
     * Standard rooms have no price markup
     * 
     * @param nights Number of nights
     * @return Total price (basePrice * nights)
     */
    @Override
    public Double calculatePrice(int nights) {
        return getBasePrice() * nights;
    }
    
    /**
     * Standard room specific behavior
     * Demonstrates ENCAPSULATION
     * 
     * @return Discount percentage for standard rooms
     */
    public double getDiscountEligibility() {
        return 0.05; // 5% discount eligible
    }
}
