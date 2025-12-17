package com.transylvania.model.hotel;

import com.transylvania.model.room.Room;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Hotel entity
 * 
 * OOP Principles Demonstrated:
 * 1. COMPOSITION - Contains Address (embedded) and List of Amenities
 * 2. ENCAPSULATION - Private fields with getters/setters
 * 3. ASSOCIATION - One-to-Many relationship with Room
 */
@Entity
@Table(name = "hotels")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    /**
     * COMPOSITION: Hotel HAS-A Address
     * Address is embedded within Hotel table
     */
    @Embedded
    private Address address;
    
    @Column(nullable = false)
    private String location; // City name for quick search
    
    @Column(length = 2000)
    private String description;
    
    @Column(nullable = false)
    private Double pricePerNight;
    
    @Column(nullable = false)
    private Double rating = 4.0;
    
    private String imageUrl;
    
    /**
     * COMPOSITION: Hotel HAS-MANY Amenities
     * Many-to-Many relationship with Amenity
     */
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "hotel_amenities",
        joinColumns = @JoinColumn(name = "hotel_id"),
        inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    private List<Amenity> amenities = new ArrayList<>();
    
    /**
     * ASSOCIATION: Hotel HAS-MANY Rooms
     * One-to-Many relationship with Room
     */
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Room> rooms = new ArrayList<>();
    
    /**
     * Business logic method
     * Demonstrates ENCAPSULATION of hotel operations
     * 
     * @param amenity Amenity to add
     */
    public void addAmenity(Amenity amenity) {
        if (!amenities.contains(amenity)) {
            amenities.add(amenity);
        }
    }
    
    /**
     * Business logic method
     * Demonstrates ENCAPSULATION of hotel operations
     * 
     * @param room Room to add
     */
    public void addRoom(Room room) {
        rooms.add(room);
        room.setHotel(this);
    }
    
    /**
     * Calculates average room price
     * Demonstrates ENCAPSULATION of business logic
     * 
     * @return Average price of all rooms
     */
    public Double getAverageRoomPrice() {
        if (rooms.isEmpty()) {
            return pricePerNight;
        }
        return rooms.stream()
            .mapToDouble(Room::getBasePrice)
            .average()
            .orElse(pricePerNight);
    }
}
