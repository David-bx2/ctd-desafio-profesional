package com.rentadavid.controller;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import com.rentadavid.model.Product;
import com.rentadavid.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/random")
    public List<Map<String, Object>> getRandomProducts() {
        List<Product> products = productService.getRandomProducts();
        
        return products.stream().map(product -> {
            Map<String, Object> productData = new HashMap<>();
            productData.put("id", product.getId());
            productData.put("name", product.getName());
            productData.put("description", product.getDescription());
    
            // Si tiene imágenes, usa la primera como imagen principal
            List<String> images = product.getImageUrls();
            productData.put("imageUrl", (images != null && !images.isEmpty()) ? images.get(0) : "default.jpg");
    
            return productData;
        }).collect(Collectors.toList());
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {
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
}
