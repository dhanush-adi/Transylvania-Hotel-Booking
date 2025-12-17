package com.transylvania.repository;

import com.transylvania.model.booking.Booking;
import com.transylvania.model.booking.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for Booking entity
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    /**
     * Find all bookings for a specific user
     * 
     * @param userId User ID
     * @return List of user's bookings
     */
    @Query("SELECT b FROM Booking b WHERE b.user.id = :userId ORDER BY b.checkInDate DESC")
    List<Booking> findByUserId(@Param("userId") Long userId);
    
    /**
     * Find all bookings for a specific hotel
     * 
     * @param hotelId Hotel ID
     * @return List of hotel's bookings
     */
    @Query("SELECT b FROM Booking b WHERE b.hotel.id = :hotelId ORDER BY b.checkInDate DESC")
    List<Booking> findByHotelId(@Param("hotelId") Long hotelId);
    
    /**
     * Find bookings by status
     * 
     * @param status Booking status
     * @return List of bookings with specified status
     */
    List<Booking> findByStatus(BookingStatus status);
    
    /**
     * Check for conflicting bookings (double booking prevention)
     * Returns bookings for the same room that overlap with the specified date range
     * 
     * @param roomId Room ID
     * @param checkIn Check-in date
     * @param checkOut Check-out date
     * @return List of conflicting bookings
     */
    @Query("SELECT b FROM Booking b WHERE b.room.id = :roomId " +
           "AND b.status = 'CONFIRMED' " +
           "AND ((b.checkInDate <= :checkOut AND b.checkOutDate >= :checkIn))")
    List<Booking> findConflictingBookings(
        @Param("roomId") Long roomId,
        @Param("checkIn") LocalDate checkIn,
        @Param("checkOut") LocalDate checkOut
    );
    
    /**
     * Find all bookings ordered by check-in date
     * 
     * @return List of all bookings
     */
    @Query("SELECT b FROM Booking b ORDER BY b.checkInDate DESC")
    List<Booking> findAllOrderByCheckInDateDesc();
}
