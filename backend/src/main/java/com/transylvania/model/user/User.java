package com.transylvania.model.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

/**
 * Abstract base class for all users in the system
 * 
 * OOP Principles Demonstrated:
 * 1. ABSTRACTION - Abstract class with abstract method getRolePermissions()
 * 2. ENCAPSULATION - Private fields with getters/setters via Lombok
 * 3. INHERITANCE - Base class for Customer, Admin, HotelManager
 * 
 * Uses JPA Single Table Inheritance Strategy
 */
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    
    /**
     * Abstract method to be implemented by subclasses
     * Demonstrates POLYMORPHISM - each user type defines its own permissions
     * 
     * @return List of permissions for this user role
     */
    public abstract List<String> getRolePermissions();
    
    /**
     * Template method pattern - common behavior for all users
     * Demonstrates ENCAPSULATION of business logic
     * 
     * @return Display name for the user
     */
    public String getDisplayName() {
        return name + " (" + role + ")";
    }
}
