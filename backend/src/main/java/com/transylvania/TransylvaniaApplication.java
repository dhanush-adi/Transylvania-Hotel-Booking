package com.transylvania;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Application Class for Transylvania Hotel Booking System
 * 
 * This application demonstrates strong OOP principles:
 * - Inheritance (User hierarchy)
 * - Polymorphism (Room pricing, Payment methods)
 * - Encapsulation (Private fields with getters/setters)
 * - Abstraction (Abstract classes and interfaces)
 * - Composition (Hotel with Address and Amenities)
 */
@SpringBootApplication
public class TransylvaniaApplication {

    public static void main(String[] args) {
        SpringApplication.run(TransylvaniaApplication.class, args);
        System.out.println("🏰 Transylvania Hotel Booking System is running on http://localhost:8080");
    }
}
