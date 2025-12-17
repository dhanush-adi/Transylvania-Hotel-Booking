package com.transylvania.service.implementations;

import com.transylvania.dto.HotelDTO;
import com.transylvania.exception.ResourceNotFoundException;
import com.transylvania.model.hotel.Address;
import com.transylvania.model.hotel.Amenity;
import com.transylvania.model.hotel.Hotel;
import com.transylvania.repository.HotelRepository;
import com.transylvania.service.interfaces.HotelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of HotelService
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class HotelServiceImpl implements HotelService {
    
    private final HotelRepository hotelRepository;
    
    @Override
    @Transactional(readOnly = true)
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", id));
    }
    
    @Override
    @Transactional
    public Hotel createHotel(HotelDTO hotelDTO) {
        log.info("Creating new hotel: {}", hotelDTO.getName());
        
        Hotel hotel = new Hotel();
        hotel.setName(hotelDTO.getName());
        hotel.setLocation(hotelDTO.getLocation());
        hotel.setDescription(hotelDTO.getDescription());
        hotel.setPricePerNight(hotelDTO.getPricePerNight());
        hotel.setRating(hotelDTO.getRating() != null ? hotelDTO.getRating() : 4.0);
        hotel.setImageUrl(hotelDTO.getImageUrl());
        
        // Create address (COMPOSITION)
        Address address = new Address();
        address.setCity(hotelDTO.getLocation());
        address.setCountry("Romania"); // Default
        hotel.setAddress(address);
        
        // Add amenities
        if (hotelDTO.getAmenities() != null) {
            List<Amenity> amenities = new ArrayList<>();
            for (String amenityName : hotelDTO.getAmenities()) {
                amenities.add(new Amenity(amenityName));
            }
            hotel.setAmenities(amenities);
        }
        
        return hotelRepository.save(hotel);
    }
    
    @Override
    @Transactional
    public Hotel updateHotel(Long id, HotelDTO hotelDTO) {
        log.info("Updating hotel: {}", id);
        
        Hotel hotel = getHotelById(id);
        hotel.setName(hotelDTO.getName());
        hotel.setLocation(hotelDTO.getLocation());
        hotel.setDescription(hotelDTO.getDescription());
        hotel.setPricePerNight(hotelDTO.getPricePerNight());
        hotel.setRating(hotelDTO.getRating());
        hotel.setImageUrl(hotelDTO.getImageUrl());
        
        return hotelRepository.save(hotel);
    }
    
    @Override
    @Transactional
    public void deleteHotel(Long id) {
        log.info("Deleting hotel: {}", id);
        Hotel hotel = getHotelById(id);
        hotelRepository.delete(hotel);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Hotel> searchHotels(String location, Double minPrice, Double maxPrice) {
        if (location != null && !location.isEmpty()) {
            return hotelRepository.findByLocationContainingIgnoreCase(location);
        } else if (minPrice != null && maxPrice != null) {
            return hotelRepository.findByPriceRange(minPrice, maxPrice);
        }
        return getAllHotels();
    }
}
