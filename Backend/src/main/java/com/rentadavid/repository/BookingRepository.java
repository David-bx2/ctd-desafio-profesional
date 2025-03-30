package com.rentadavid.repository;

import com.rentadavid.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate end, LocalDate start);

    List<Booking> findByProductId(Long productId);

    @Query("SELECT b FROM Booking b " +
       "WHERE b.product.id = :productId " +
       "AND b.startDate <= :end AND b.endDate >= :start")
List<Booking> findBookingsBetweenDatesAndProduct(
    @Param("productId") Long productId,
    @Param("start") LocalDate start,
    @Param("end") LocalDate end
);


}

