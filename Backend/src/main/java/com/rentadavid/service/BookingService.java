package com.rentadavid.service;

import com.rentadavid.model.Booking;
import com.rentadavid.repository.BookingRepository;
import org.springframework.stereotype.Service;
import com.rentadavid.model.Product;
import com.rentadavid.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ProductRepository productRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, ProductRepository productRepository) {
        this.bookingRepository = bookingRepository;
        this.productRepository = productRepository;
    }

    public List<Booking> findBookingsBetween(LocalDate start, LocalDate end) {
        return bookingRepository.findByStartDateLessThanEqualAndEndDateGreaterThanEqual(end, start);
    }

    public List<Booking> findByProductId(Long productId) {
        return bookingRepository.findByProductId(productId);
    }

    public Booking createBooking(Long productId, LocalDate start, LocalDate end) {
        List<Booking> overlapping = bookingRepository.findBookingsBetweenDatesAndProduct(
            productId, start, end
        );

        if (!overlapping.isEmpty()) {
            throw new IllegalStateException("Este producto ya está reservado en ese rango de fechas");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        Booking booking = new Booking(start, end, product);
        return bookingRepository.save(booking);
    }
}
