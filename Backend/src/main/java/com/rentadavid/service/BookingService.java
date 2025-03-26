package com.rentadavid.service;

import com.rentadavid.model.Booking;
import com.rentadavid.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> findBookingsBetween(LocalDate start, LocalDate end) {
        return bookingRepository.findByStartDateLessThanEqualAndEndDateGreaterThanEqual(end, start);
    }
}

