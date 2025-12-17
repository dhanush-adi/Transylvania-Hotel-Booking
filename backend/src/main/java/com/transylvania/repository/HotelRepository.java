package com.transylvania.repository;

import com.transylvania.model.hotel.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Hotel entity
 */
@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    
    /**
     * Find hotels by location (city)
     * 
     * @param location City name
     * @return List of hotels in that location
     */
    List<Hotel> findByLocationContainingIgnoreCase(String location);
    
    /**
     * Find hotels by name
     * 
     * @param name Hotel name
     * @return List of hotels matching name
     */
    List<Hotel> findByNameContainingIgnoreCase(String name);
    
    /**
     * Find hotels by rating greater than or equal to specified value
     * 
     * @param rating Minimum rating
     * @return List of hotels with rating >= specified value
     */
    List<Hotel> findByRatingGreaterThanEqual(Double rating);
    
    /**
     * Find hotels by price range
     * 
     * @param minPrice Minimum price
     * @param maxPrice Maximum price
     * @return List of hotels within price range
     */
    @Query("SELECT h FROM Hotel h WHERE h.pricePerNight BETWEEN :minPrice AND :maxPrice")
    List<Hotel> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);
}
