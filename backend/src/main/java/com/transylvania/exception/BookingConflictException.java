package com.transylvania.exception;

/**
 * Custom exception for booking conflicts (double booking)
 */
public class BookingConflictException extends RuntimeException {
    
    public BookingConflictException(String message) {
        super(message);
    }
}
