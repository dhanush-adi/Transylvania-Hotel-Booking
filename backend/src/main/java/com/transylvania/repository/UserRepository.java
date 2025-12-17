package com.transylvania.repository;

import com.transylvania.model.user.User;
import com.transylvania.model.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity
 * Spring Data JPA will automatically implement this interface
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by email
     * Used for authentication
     * 
     * @param email User email
     * @return Optional containing user if found
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if email exists
     * Used for registration validation
     * 
     * @param email Email to check
     * @return true if email exists
     */
    boolean existsByEmail(String email);
    
    /**
     * Find users by role
     * 
     * @param role User role
     * @return List of users with specified role
     */
    List<User> findByRole(UserRole role);
}
