package com.transylvania.model.room;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

/**
 * Deluxe Room type - extends Room
 * 
 * OOP Principles Demonstrated:
 * 1. INHERITANCE - Extends abstract Room class
 * 2. POLYMORPHISM - Implements abstract method with 20% premium pricing
 */
@Entity
@DiscriminatorValue("DELUXE")
@NoArgsConstructor
public class DeluxeRoom extends Room {
    
    private static final double PREMIUM_MULTIPLIER = 1.20; // 20% premium
    
    /**
     * Implements abstract method from Room
     * Deluxe rooms have 20% price premium
     * 
     * @param nights Number of nights
     * @return Total price with 20% premium
     */
    @Override
    public Double calculatePrice(int nights) {
        return getBasePrice() * PREMIUM_MULTIPLIER * nights;
    }
    
    /**
     * Deluxe room specific behavior
     * Demonstrates ENCAPSULATION
     * 
     * @return Premium percentage
     */
    public double getPremiumPercentage() {
        return (PREMIUM_MULTIPLIER - 1.0) * 100; // Returns 20.0
    }
    
    /**
     * Deluxe room specific amenities
     * Demonstrates ENCAPSULATION of room-specific features
     * 
     * @return true if includes premium amenities
     */
    public boolean includesPremiumAmenities() {
        return true; // Deluxe rooms include premium amenities
    }
}
