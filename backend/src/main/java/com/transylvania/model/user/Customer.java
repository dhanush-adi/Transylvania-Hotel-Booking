package com.transylvania.model.user;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

/**
 * Customer user type - extends User
 * 
 * OOP Principles Demonstrated:
 * 1. INHERITANCE - Extends abstract User class
 * 2. POLYMORPHISM - Implements abstract method with customer-specific behavior
 */
@Entity
@DiscriminatorValue("CUSTOMER")
@NoArgsConstructor
public class Customer extends User {
    
    /**
     * Implements abstract method from User
     * Returns customer-specific permissions
     * 
     * @return List of customer permissions
     */
    @Override
    public List<String> getRolePermissions() {
        return Arrays.asList(
            "VIEW_HOTELS",
            "BOOK_ROOMS",
            "VIEW_OWN_BOOKINGS",
            "CANCEL_OWN_BOOKINGS"
        );
    }
    
    /**
     * Customer-specific business logic
     * Demonstrates ENCAPSULATION of customer behavior
     * 
     * @return true if customer can make bookings
     */
    public boolean canMakeBooking() {
        return true; // Can add additional validation logic here
    }
}
