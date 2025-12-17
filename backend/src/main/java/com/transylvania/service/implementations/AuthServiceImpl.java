package com.transylvania.service.implementations;

import com.transylvania.dto.AuthResponse;
import com.transylvania.dto.LoginRequest;
import com.transylvania.dto.RegisterRequest;
import com.transylvania.model.user.*;
import com.transylvania.repository.UserRepository;
import com.transylvania.security.JwtUtil;
import com.transylvania.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementation of AuthService
 * 
 * OOP Principles Demonstrated:
 * 1. INTERFACE IMPLEMENTATION - Implements AuthService interface
 * 2. ENCAPSULATION - Business logic encapsulated in service
 * 3. DEPENDENCY INJECTION - Dependencies injected via constructor
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    /**
     * Register a new user
     * Demonstrates POLYMORPHISM - creates different user types based on role
     */
    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        log.info("Registering new user: {}", request.getEmail());
        
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        
        // Determine role (default to CUSTOMER)
        UserRole role = request.getRole() != null ? request.getRole() : UserRole.CUSTOMER;
        
        // Create appropriate user type based on role (POLYMORPHISM)
        User user = createUserByRole(role);
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        
        // Save user
        user = userRepository.save(user);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), user.getRole().name());
        
        // Create response
        AuthResponse.UserDTO userDTO = new AuthResponse.UserDTO(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole().name()
        );
        
        log.info("User registered successfully: {}", user.getEmail());
        return new AuthResponse(token, userDTO);
    }
    
    /**
     * Login user
     */
    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        log.info("Login attempt for user: {}", request.getEmail());
        
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), user.getRole().name());
        
        // Create response
        AuthResponse.UserDTO userDTO = new AuthResponse.UserDTO(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole().name()
        );
        
        log.info("User logged in successfully: {}", user.getEmail());
        return new AuthResponse(token, userDTO);
    }
    
    /**
     * Factory method to create user by role
     * Demonstrates POLYMORPHISM and FACTORY PATTERN
     * 
     * @param role User role
     * @return User instance of appropriate type
     */
    private User createUserByRole(UserRole role) {
        return switch (role) {
            case ADMIN -> new Admin();
            case HOTEL_MANAGER -> new HotelManager();
            default -> new Customer();
        };
    }
}
