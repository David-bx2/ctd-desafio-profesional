package com.rentadavid.controller;

import com.rentadavid.model.Favorite;
import com.rentadavid.model.User;
import com.rentadavid.model.Product;
import com.rentadavid.service.FavoriteService;
import com.rentadavid.service.UserService;
import com.rentadavid.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<?> addFavorite(@RequestParam Long userId, @RequestParam Long productId) {
        Optional<User> userOpt = userService.getUserById(userId);
        Optional<Product> productOpt = productService.getProductById(productId);

        if (userOpt.isEmpty() || productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Usuario o producto no encontrado");
        }

        Favorite saved = favoriteService.addFavorite(userOpt.get(), productOpt.get());
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping
    public ResponseEntity<?> removeFavorite(@RequestParam Long userId, @RequestParam Long productId) {
        favoriteService.removeFavorite(userId, productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Favorite>> getFavorites(@RequestParam Long userId) {
        return ResponseEntity.ok(favoriteService.getFavoritesByUser(userId));
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isFavorite(@RequestParam Long userId, @RequestParam Long productId) {
        boolean isFav = favoriteService.isFavorite(userId, productId);
        return ResponseEntity.ok(isFav);
    }
} 
