package com.transylvania.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Utility class for JWT token operations
 * Demonstrates ENCAPSULATION of JWT logic
 */
@Component
public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration;
    
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    /**
     * Generate JWT token for user
     * 
     * @param email User email
     * @param userId User ID
     * @param role User role
     * @return JWT token
     */
    public String generateToken(String email, Long userId, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("role", role);
        return createToken(claims, email);
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }
    
    /**
     * Extract email from token
     */
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    /**
     * Extract user ID from token
     */
    public Long extractUserId(String token) {
        return extractClaim(token, claims -> claims.get("userId", Long.class));
    }
    
    /**
     * Extract role from token
     */
    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }
    
    /**
     * Extract expiration date from token
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    
    /**
     * Check if token is expired
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    /**
     * Validate token
     */
    public Boolean validateToken(String token, String email) {
        final String tokenEmail = extractEmail(token);
        return (tokenEmail.equals(email) && !isTokenExpired(token));
    }
}
