package com.transylvania.model.hotel;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Address class - Embeddable component
 * 
 * OOP Principles Demonstrated:
 * 1. COMPOSITION - Used as part of Hotel entity
 * 2. ENCAPSULATION - Private fields with getters/setters
 */
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    
    private String street;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    
    /**
     * Returns formatted address string
     * Demonstrates ENCAPSULATION of formatting logic
     * 
     * @return Formatted address
     */
    public String getFormattedAddress() {
        return String.format("%s, %s, %s, %s %s", 
            street, city, state, country, zipCode);
    }
}
