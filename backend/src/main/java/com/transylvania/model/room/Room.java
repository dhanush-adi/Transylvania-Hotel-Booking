package com.transylvania.model.room;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.transylvania.model.hotel.Hotel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Abstract base class for all room types
 * 
 * OOP Principles Demonstrated:
 * 1. ABSTRACTION - Abstract class with abstract method calculatePrice()
 * 2. ENCAPSULATION - Private fields with getters/setters
 * 3. INHERITANCE - Base class for StandardRoom, DeluxeRoom, SuiteRoom
 * 4. POLYMORPHISM - Each subclass implements its own pricing logic
 * 
 * Uses JPA Single Table Inheritance Strategy
 */
@Entity
@Table(name = "rooms")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "room_type_enum", discriminatorType = DiscriminatorType.STRING)
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class Room {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String type; // Display name like "Deluxe Suite"
    
    @Enumerated(EnumType.STRING)
    @Column(name = "room_type", nullable = false)
    private RoomType roomType;
    
    @Column(nullable = false)
    private Double basePrice;
    
    @Column(nullable = false)
    private Integer capacity = 2;
    
    @Column(length = 1000)
    private String description;
    
    private String bedType;
    
    @Column(nullable = false)
    private Boolean available = true;
    
    private String imageUrl;
    
    /**
     * ASSOCIATION: Room belongs to Hotel
     * Many-to-One relationship
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    @JsonIgnore
    private Hotel hotel;
    
    /**
     * Abstract method to calculate price based on number of nights
     * Demonstrates POLYMORPHISM - each room type has different pricing logic
     * 
     * @param nights Number of nights
     * @return Total price for the stay
     */
    public abstract Double calculatePrice(int nights);
    
    /**
     * Template method pattern - common behavior for all rooms
     * Demonstrates ENCAPSULATION of business logic
     * 
     * @return Price per night (may include markup)
     */
    public Double getPricePerNight() {
        return calculatePrice(1);
    }
    
    /**
     * Business logic method
     * Demonstrates ENCAPSULATION
     * 
     * @return true if room can be booked
     */
    public boolean isBookable() {
        return available;
    }
}
