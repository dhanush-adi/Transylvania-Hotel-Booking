package com.transylvania.model.hotel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Amenity entity representing hotel amenities
 * 
 * OOP Principles Demonstrated:
 * 1. ENCAPSULATION - Private fields with getters/setters
 */
@Entity
@Table(name = "amenities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Amenity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 500)
    private String description;
    
    @Column(nullable = false)
    private boolean available = true;
    
    public Amenity(String name) {
        this.name = name;
        this.available = true;
    }
}
