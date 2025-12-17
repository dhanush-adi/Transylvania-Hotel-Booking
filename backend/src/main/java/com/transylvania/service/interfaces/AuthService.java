package com.transylvania.service.interfaces;

import com.transylvania.dto.AuthResponse;
import com.transylvania.dto.LoginRequest;
import com.transylvania.dto.RegisterRequest;

/**
 * Service interface for authentication operations
 * Demonstrates INTERFACE abstraction pattern
 */
public interface AuthService {
    
    /**
     * Register a new user
     * 
     * @param request Registration request
     * @return Authentication response with token
     */
    AuthResponse register(RegisterRequest request);
    
    /**
     * Login user
     * 
     * @param request Login request
     * @return Authentication response with token
     */
    AuthResponse login(LoginRequest request);
}
