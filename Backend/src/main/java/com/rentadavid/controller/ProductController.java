package com.rentadavid.controller;

import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import com.rentadavid.model.Product;
import com.rentadavid.model.Category;
import com.rentadavid.service.ProductService;
import com.rentadavid.repository.CategoryRepository;
import com.rentadavid.model.Booking;
import com.rentadavid.service.BookingService;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductController(ProductService productService, CategoryRepository categoryRepository) {
        this.productService = productService;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/random")
    public List<Map<String, Object>> getRandomProducts() {
        List<Product> products = productService.getRandomProducts();

        return products.stream().map(product -> {
            Map<String, Object> productData = new HashMap<>();
            productData.put("id", product.getId());
            productData.put("name", product.getName());
            productData.put("description", product.getDescription());

            List<String> images = product.getImageUrls();
            productData.put("imageUrl", (images != null && !images.isEmpty()) ? images.get(0) : "default.jpg");

            return productData;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);

        if (product.isPresent()) {
            Product prod = product.get();
            if (prod.getCategory() != null) {
                prod.setCategory(prod.getCategory());
            }
            return ResponseEntity.ok(prod);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {
            if (product.getCategory() != null) {
                Category category = categoryRepository.findById(product.getCategory().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Categoría no válida"));
                product.setCategory(category);
            }
            Product savedProduct = productService.saveProduct(product);
            return ResponseEntity.ok(savedProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkProductName(@RequestParam String name) {
        boolean exists = productService.existsByName(name);
        return ResponseEntity.ok(Collections.singletonMap("exists", exists));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        if (productService.getProductById(id).isPresent()) {
            productService.deleteProduct(id);
            return ResponseEntity.ok("Producto eliminado correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/{id}/category/{categoryId}")
    public ResponseEntity<Product> assignCategoryToProduct(@PathVariable Long id, @PathVariable Long categoryId) {
        Optional<Product> optionalProduct = productService.getProductById(id);
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);

        if (optionalProduct.isPresent() && optionalCategory.isPresent()) {
            Product product = optionalProduct.get();
            product.setCategory(optionalCategory.get());
            productService.saveProduct(product);
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        try {
            Product updated = productService.updateProduct(id, updatedProduct);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar producto");
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> getProductsByCategoryIds(@RequestParam List<Long> categories) {
        List<Product> products = productService.getProductsByCategoryIds(categories);
        return ResponseEntity.ok(products);
    }

    @Autowired
    private BookingService bookingService;

    @GetMapping("/available")
    public ResponseEntity<List<Product>> getAvailableProducts(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {

        List<Booking> overlappingBookings = bookingService.findBookingsBetween(start, end);
        List<Long> reservedProductIds = overlappingBookings.stream()
                .map(b -> b.getProduct().getId())
                .distinct()
                .toList();

        List<Product> availableProducts = productService.getAvailableProductsExcluding(reservedProductIds);
        return ResponseEntity.ok(availableProducts);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchByKeyword(@RequestParam(required = false) String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            // Si no hay keyword, devolvemos lista vacía
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<Product> results = productService.searchByKeyword(keyword.trim());
        return ResponseEntity.ok(results);
    }

    @GetMapping("/unavailable-dates")
    public ResponseEntity<List<LocalDate>> getUnavailableDates(@RequestParam Long productId) {
        List<Booking> bookings = bookingService.findByProductId(productId);
        List<LocalDate> unavailableDates = new ArrayList<>();

        for (Booking booking : bookings) {
            LocalDate current = booking.getStartDate();
            while (!current.isAfter(booking.getEndDate())) {
                unavailableDates.add(current);
                current = current.plusDays(1);
            }
        }

        return ResponseEntity.ok(unavailableDates);
    }

}
