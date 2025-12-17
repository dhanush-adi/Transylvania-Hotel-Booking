package com.transylvania.service.implementations;

import com.transylvania.dto.RoomDTO;
import com.transylvania.exception.ResourceNotFoundException;
import com.transylvania.model.hotel.Hotel;
import com.transylvania.model.room.*;
import com.transylvania.repository.HotelRepository;
import com.transylvania.repository.RoomRepository;
import com.transylvania.service.interfaces.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implementation of RoomService
 * Demonstrates POLYMORPHISM in room creation
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RoomServiceImpl implements RoomService {
    
    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;
    
    @Override
    @Transactional(readOnly = true)
    public List<Room> getRoomsByHotelId(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Room", "id", id));
    }
    
    /**
     * Create room with POLYMORPHISM
     * Creates different room types based on type string
     */
    @Override
    @Transactional
    public Room createRoom(Long hotelId, RoomDTO roomDTO) {
        log.info("Creating new room for hotel: {}", hotelId);
        
        Hotel hotel = hotelRepository.findById(hotelId)
            .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", hotelId));
        
        // Create appropriate room type (POLYMORPHISM)
        Room room = createRoomByType(roomDTO.getType());
        room.setType(roomDTO.getType());
        room.setBasePrice(roomDTO.getPricePerNight());
        room.setCapacity(roomDTO.getCapacity() != null ? roomDTO.getCapacity() : 2);
        room.setDescription(roomDTO.getDescription());
        room.setBedType(roomDTO.getBedType());
        room.setAvailable(roomDTO.getAvailable() != null ? roomDTO.getAvailable() : true);
        room.setImageUrl(roomDTO.getImageUrl());
        room.setHotel(hotel);
        
        return roomRepository.save(room);
    }
    
    @Override
    @Transactional
    public Room updateRoom(Long id, RoomDTO roomDTO) {
        log.info("Updating room: {}", id);
        
        Room room = getRoomById(id);
        room.setType(roomDTO.getType());
        room.setBasePrice(roomDTO.getPricePerNight());
        room.setCapacity(roomDTO.getCapacity());
        room.setDescription(roomDTO.getDescription());
        room.setBedType(roomDTO.getBedType());
        room.setAvailable(roomDTO.getAvailable());
        room.setImageUrl(roomDTO.getImageUrl());
        
        return roomRepository.save(room);
    }
    
    @Override
    @Transactional
    public void deleteRoom(Long id) {
        log.info("Deleting room: {}", id);
        Room room = getRoomById(id);
        roomRepository.delete(room);
    }
    
    /**
     * Factory method to create room by type
     * Demonstrates POLYMORPHISM and FACTORY PATTERN
     * 
     * @param type Room type string
     * @return Room instance of appropriate type
     */
    private Room createRoomByType(String type) {
        String typeLower = type.toLowerCase();
        
        if (typeLower.contains("suite")) {
            SuiteRoom room = new SuiteRoom();
            room.setRoomType(RoomType.SUITE);
            return room;
        } else if (typeLower.contains("deluxe")) {
            DeluxeRoom room = new DeluxeRoom();
            room.setRoomType(RoomType.DELUXE);
            return room;
        } else {
            StandardRoom room = new StandardRoom();
            room.setRoomType(RoomType.STANDARD);
            return room;
        }
    }
}
