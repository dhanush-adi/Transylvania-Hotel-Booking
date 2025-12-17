package com.transylvania.controller;

import com.transylvania.dto.HotelDTO;
import com.transylvania.model.hotel.Hotel;
import com.transylvania.service.interfaces.HotelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for hotel endpoints
 */
@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HotelController {
    
    private final HotelService hotelService;
    
    /**
     * Get all hotels
     * GET /api/hotels
     */
    @GetMapping
    public ResponseEntity<List<Hotel>> getAllHotels(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        
        List<Hotel> hotels;
        if (location != null || (minPrice != null && maxPrice != null)) {
            hotels = hotelService.searchHotels(location, minPrice, maxPrice);
        } else {
            hotels = hotelService.getAllHotels();
        }
        return ResponseEntity.ok(hotels);
    }
    
    /**
     * Get hotel by ID
     * GET /api/hotels/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        Hotel hotel = hotelService.getHotelById(id);
        return ResponseEntity.ok(hotel);
    }
    
    /**
     * Create new hotel (Admin/Manager only)
     * POST /api/hotels
     */
    @PostMapping
    public ResponseEntity<Hotel> createHotel(@Valid @RequestBody HotelDTO hotelDTO) {
        Hotel hotel = hotelService.createHotel(hotelDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(hotel);
    }
    
    /**
     * Update hotel (Admin/Manager only)
     * PUT /api/hotels/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Hotel> updateHotel(
            @PathVariable Long id,
            @Valid @RequestBody HotelDTO hotelDTO) {
        Hotel hotel = hotelService.updateHotel(id, hotelDTO);
        return ResponseEntity.ok(hotel);
    }
    
    /**
     * Delete hotel (Admin only)
     * DELETE /api/hotels/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return ResponseEntity.noContent().build();
    }
}
