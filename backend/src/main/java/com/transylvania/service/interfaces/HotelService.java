package com.transylvania.service.interfaces;

import com.transylvania.dto.HotelDTO;
import com.transylvania.model.hotel.Hotel;

import java.util.List;

/**
 * Service interface for hotel operations
 */
public interface HotelService {
    
    List<Hotel> getAllHotels();
    
    Hotel getHotelById(Long id);
    
    Hotel createHotel(HotelDTO hotelDTO);
    
    Hotel updateHotel(Long id, HotelDTO hotelDTO);
    
    void deleteHotel(Long id);
    
    List<Hotel> searchHotels(String location, Double minPrice, Double maxPrice);
}
