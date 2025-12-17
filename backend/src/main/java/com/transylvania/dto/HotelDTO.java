package com.transylvania.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for hotel data transfer
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelDTO {
    
    private Long id;
    
    @NotBlank(message = "Hotel name is required")
    private String name;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    private String description;
    
    @NotNull(message = "Price per night is required")
    @Positive(message = "Price must be positive")
    private Double pricePerNight;
    
    private Double rating;
    
    private String imageUrl;
    
    private List<String> amenities;
}
