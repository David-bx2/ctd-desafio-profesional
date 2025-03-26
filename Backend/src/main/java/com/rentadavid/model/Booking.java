package com.rentadavid.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Booking() {}

    public Booking(LocalDate startDate, LocalDate endDate, Product product) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;
    }

    public Long getId() { return id; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
    public Product getProduct() { return product; }

    public void setId(Long id) { this.id = id; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public void setProduct(Product product) { this.product = product; }
}
