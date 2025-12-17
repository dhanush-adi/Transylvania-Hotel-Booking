package com.transylvania.repository;

import com.transylvania.model.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Room entity
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    
    /**
     * Find all rooms for a specific hotel
     * 
     * @param hotelId Hotel ID
     * @return List of rooms in that hotel
     */
    @Query("SELECT r FROM Room r WHERE r.hotel.id = :hotelId")
    List<Room> findByHotelId(@Param("hotelId") Long hotelId);
    
    /**
     * Find available rooms for a specific hotel
     * 
     * @param hotelId Hotel ID
     * @return List of available rooms
     */
    @Query("SELECT r FROM Room r WHERE r.hotel.id = :hotelId AND r.available = true")
    List<Room> findAvailableRoomsByHotelId(@Param("hotelId") Long hotelId);
    
    /**
     * Find rooms by type
     * 
     * @param type Room type
     * @return List of rooms of specified type
     */
    List<Room> findByType(String type);
}
