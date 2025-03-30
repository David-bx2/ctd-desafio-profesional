package com.rentadavid.service;

import com.rentadavid.model.Booking;
import com.rentadavid.repository.BookingRepository;
import org.springframework.stereotype.Service;
import com.rentadavid.model.Product;
import com.rentadavid.repository.ProductRepository;
import com.rentadavid.repository.UserRepository;
import com.rentadavid.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    
    @Autowired
    public BookingService(BookingRepository bookingRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository; 
    }
    

    public List<Booking> findBookingsBetween(LocalDate start, LocalDate end) {
        return bookingRepository.findByStartDateLessThanEqualAndEndDateGreaterThanEqual(end, start);
    }

    public List<Booking> findByProductId(Long productId) {
        return bookingRepository.findByProductId(productId);
    }

    public List<Booking> findByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> findByUserOrdered(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    

    public Booking createBooking(Long productId, Long userId, LocalDate start, LocalDate end, String phoneNumber) {
        List<Booking> overlapping = bookingRepository.findBookingsBetweenDatesAndProduct(productId, start, end);
    
        if (!overlapping.isEmpty()) {
            throw new IllegalStateException("Este producto ya está reservado en ese rango de fechas");
        }
    
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
    
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
    
        Booking booking = new Booking(start, end, product, user, phoneNumber);
        return bookingRepository.save(booking);
    }
    
}
