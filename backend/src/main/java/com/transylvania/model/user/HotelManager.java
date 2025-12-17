package com.transylvania.model.user;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

/**
 * Hotel Manager user type - extends User
 * 
 * OOP Principles Demonstrated:
 * 1. INHERITANCE - Extends abstract User class
 * 2. POLYMORPHISM - Implements abstract method with manager-specific behavior
 */
@Entity
@DiscriminatorValue("HOTEL_MANAGER")
@NoArgsConstructor
public class HotelManager extends User {
    
    /**
     * Implements abstract method from User
     * Returns manager-specific permissions (hotel management only)
     * 
     * @return List of manager permissions
     */
    @Override
    public List<String> getRolePermissions() {
        return Arrays.asList(
            "VIEW_HOTELS",
            "CREATE_HOTELS",
            "UPDATE_HOTELS",
            "CREATE_ROOMS",
            "UPDATE_ROOMS",
            "VIEW_ALL_BOOKINGS"
        );
    }
    
    /**
     * Manager-specific business logic
     * Demonstrates ENCAPSULATION of manager behavior
     * 
     * @return true if manager can manage hotels
     */
    public boolean canManageHotels() {
        return true;
    }
}
