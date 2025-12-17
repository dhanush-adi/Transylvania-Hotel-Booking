package com.transylvania.model.user;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

/**
 * Admin user type - extends User
 * 
 * OOP Principles Demonstrated:
 * 1. INHERITANCE - Extends abstract User class
 * 2. POLYMORPHISM - Implements abstract method with admin-specific behavior
 */
@Entity
@DiscriminatorValue("ADMIN")
@NoArgsConstructor
public class Admin extends User {
    
    /**
     * Implements abstract method from User
     * Returns admin-specific permissions (full access)
     * 
     * @return List of admin permissions
     */
    @Override
    public List<String> getRolePermissions() {
        return Arrays.asList(
            "VIEW_HOTELS",
            "CREATE_HOTELS",
            "UPDATE_HOTELS",
            "DELETE_HOTELS",
            "CREATE_ROOMS",
            "UPDATE_ROOMS",
            "DELETE_ROOMS",
            "VIEW_ALL_BOOKINGS",
            "MANAGE_USERS"
        );
    }
    
    /**
     * Admin-specific business logic
     * Demonstrates ENCAPSULATION of admin behavior
     * 
     * @return true if admin has full system access
     */
    public boolean hasFullAccess() {
        return true;
    }
}
