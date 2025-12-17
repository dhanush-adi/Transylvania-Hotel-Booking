package com.transylvania.controller;

import com.transylvania.dto.RoomDTO;
import com.transylvania.model.room.Room;
import com.transylvania.service.interfaces.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for room endpoints
 */
@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RoomController {
    
    private final RoomService roomService;
    
    /**
     * Get all rooms for a hotel
     * GET /api/hotels/{hotelId}/rooms
     */
    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<List<Room>> getRoomsByHotelId(@PathVariable Long hotelId) {
        List<Room> rooms = roomService.getRoomsByHotelId(hotelId);
        return ResponseEntity.ok(rooms);
    }
    
    /**
     * Create new room (Admin/Manager only)
     * POST /api/hotels/{hotelId}/rooms
     */
    @PostMapping("/{hotelId}/rooms")
    public ResponseEntity<Room> createRoom(
            @PathVariable Long hotelId,
            @Valid @RequestBody RoomDTO roomDTO) {
        Room room = roomService.createRoom(hotelId, roomDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }
    
    /**
     * Update room (Admin/Manager only)
     * PUT /api/rooms/{id}
     */
    @PutMapping("/rooms/{id}")
    public ResponseEntity<Room> updateRoom(
            @PathVariable Long id,
            @Valid @RequestBody RoomDTO roomDTO) {
        Room room = roomService.updateRoom(id, roomDTO);
        return ResponseEntity.ok(room);
    }
    
    /**
     * Delete room (Admin only)
     * DELETE /api/rooms/{id}
     */
    @DeleteMapping("/rooms/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
