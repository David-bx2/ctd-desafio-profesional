package com.rentadavid.service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;
import com.rentadavid.model.Product;
import com.rentadavid.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;


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

    public List<Product> getProductsByCategoryIds(List<Long> categoryIds) {
        return productRepository.findByCategoryIdIn(categoryIds);
    }
    

    public Product updateProduct(Long id, Product updatedProduct) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new NoSuchElementException("Producto no encontrado");
        }
    
        Optional<Product> existing = productRepository.findByName(updatedProduct.getName());
        if (existing.isPresent() && !existing.get().getId().equals(id)) {
            throw new IllegalArgumentException("Ya existe un producto con este nombre.");
        }
    
        Product product = optionalProduct.get();
        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setImageUrls(updatedProduct.getImageUrls());
        product.setCategory(updatedProduct.getCategory());
        product.setFeatures(updatedProduct.getFeatures());
    
        return productRepository.save(product);
    }
    
    public List<Product> getAvailableProductsExcluding(List<Long> excludedIds) {
        if (excludedIds.isEmpty()) {
            return productRepository.findAll();
        } else {
            return productRepository.findByIdNotIn(excludedIds);
        }
    }

    public List<Product> searchByKeyword(String keyword) {
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }
    
    
}
