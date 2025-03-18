package com.rentadavid.service;

import com.rentadavid.model.Product;
import com.rentadavid.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getRandomProducts() {
        return productRepository.findRandomProducts();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public boolean existsByName(String name) {
        return productRepository.existsByName(name); 
    }

    public Product saveProduct(Product product) {
        if (existsByName(product.getName())) {
            throw new IllegalArgumentException("Ya existe un producto con este nombre.");
        }
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
