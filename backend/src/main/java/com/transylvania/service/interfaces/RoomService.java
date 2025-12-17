package com.transylvania.service.interfaces;

import com.transylvania.dto.RoomDTO;
import com.transylvania.model.room.Room;

import java.util.List;

/**
 * Service interface for room operations
 */
public interface RoomService {
    
    List<Room> getRoomsByHotelId(Long hotelId);
    
    Room getRoomById(Long id);
    
    Room createRoom(Long hotelId, RoomDTO roomDTO);
    
    Room updateRoom(Long id, RoomDTO roomDTO);
    
    void deleteRoom(Long id);
}
