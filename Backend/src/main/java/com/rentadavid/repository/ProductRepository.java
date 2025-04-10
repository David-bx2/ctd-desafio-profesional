package com.rentadavid.repository;

import com.rentadavid.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM product ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Product> findRandomProducts();

    boolean existsByName(String name);

    List<Product> findByCategoryId(Long categoryId);

    Optional<Product> findByName(String name);

    List<Product> findByCategoryIdIn(List<Long> categoryIds);

    List<Product> findByIdNotIn(List<Long> ids);

    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);

}
