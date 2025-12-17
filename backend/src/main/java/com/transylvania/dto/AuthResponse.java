package com.transylvania.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for authentication response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    private String token;
    private UserDTO user;
    
    /**
     * Nested DTO for user information
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserDTO {
        private Long id;
        private String name;
        private String email;
        private String role;
    }
}
