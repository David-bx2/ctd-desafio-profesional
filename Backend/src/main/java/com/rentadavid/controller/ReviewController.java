package com.rentadavid.controller;

import com.rentadavid.model.Review;
import com.rentadavid.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody Review review) {
        Review saved = reviewService.saveReview(review);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/product/{productId}")
    public List<Review> getReviewsForProduct(@PathVariable Long productId) {
        return reviewService.getReviewsByProduct(productId);
    }

    @GetMapping("/product/{productId}/average")
    public Map<String, Object> getAverageRating(@PathVariable Long productId) {
        Double avg = reviewService.getAverageRating(productId);
        long count = reviewService.getTotalReviews(productId);
        Map<String, Object> response = new HashMap<>();
        response.put("average", avg != null ? Math.round(avg * 10.0) / 10.0 : 0);
        response.put("count", count);
        return response;
    }
}
