package com.transylvania.model.room;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

/**
 * Suite Room type - extends Room
 * 
 * OOP Principles Demonstrated:
 * 1. INHERITANCE - Extends abstract Room class
 * 2. POLYMORPHISM - Implements abstract method with 50% premium pricing
 */
@Entity
@DiscriminatorValue("SUITE")
@NoArgsConstructor
public class SuiteRoom extends Room {
    
    private static final double PREMIUM_MULTIPLIER = 1.50; // 50% premium
    
    /**
     * Implements abstract method from Room
     * Suite rooms have 50% price premium
     * 
     * @param nights Number of nights
     * @return Total price with 50% premium
     */
    @Override
    public Double calculatePrice(int nights) {
        return getBasePrice() * PREMIUM_MULTIPLIER * nights;
    }
    
    /**
     * Suite room specific behavior
     * Demonstrates ENCAPSULATION
     * 
     * @return Premium percentage
     */
    public double getPremiumPercentage() {
        return (PREMIUM_MULTIPLIER - 1.0) * 100; // Returns 50.0
    }
    
    /**
     * Suite room specific amenities
     * Demonstrates ENCAPSULATION of room-specific features
     * 
     * @return true if includes luxury amenities
     */
    public boolean includesLuxuryAmenities() {
        return true; // Suite rooms include luxury amenities
    }
    
    /**
     * Suite-specific feature
     * Demonstrates ENCAPSULATION
     * 
     * @return true if suite has separate living area
     */
    public boolean hasSeparateLivingArea() {
        return true;
    }
}
