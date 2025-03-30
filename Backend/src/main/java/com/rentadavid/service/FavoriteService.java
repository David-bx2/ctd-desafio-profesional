package com.rentadavid.service;

import com.rentadavid.model.Favorite;
import com.rentadavid.model.User;
import com.rentadavid.model.Product;
import com.rentadavid.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    public List<Favorite> getFavoritesByUser(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    public Favorite addFavorite(User user, Product product) {
        Optional<Favorite> existing = favoriteRepository.findByUserIdAndProductId(user.getId(), product.getId());
        if (existing.isPresent())
            return existing.get();
        return favoriteRepository.save(new Favorite(user, product));
    }

    public void removeFavorite(Long userId, Long productId) {
        Optional<Favorite> existing = favoriteRepository.findByUserIdAndProductId(userId, productId);
        existing.ifPresent(favoriteRepository::delete);
    }

    public boolean isFavorite(Long userId, Long productId) {
        return favoriteRepository.findByUserIdAndProductId(userId, productId).isPresent();
    }
}
