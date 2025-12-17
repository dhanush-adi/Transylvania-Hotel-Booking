package com.transylvania.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for room data transfer
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    
    private Long id;
    
    @NotBlank(message = "Room type is required")
    private String type;
    
    @NotNull(message = "Price per night is required")
    @Positive(message = "Price must be positive")
    private Double pricePerNight;
    
    private Integer capacity;
    
    private String description;
    
    private String bedType;
    
    private Boolean available;
    
    private String imageUrl;
}
