package com.rentadavid.repository;

import com.rentadavid.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate end, LocalDate start);
}

