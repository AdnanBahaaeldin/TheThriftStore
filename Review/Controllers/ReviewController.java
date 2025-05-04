package com.online.TheThriftStore.Controllers;

import com.online.TheThriftStore.Models.Review;
import com.online.TheThriftStore.Services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestParam Long orderId,
                                            @RequestParam String description,
                                            @RequestParam Long rate) {
        try {
            return ResponseEntity.ok(reviewService.addReview(orderId, description, rate));
        } catch (Exception e) {
            return new ResponseEntity<> (HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get")
    public ResponseEntity<?> getReviewByOrderId(@RequestParam Long orderId) {
        try {
            Review review = reviewService.getReviewByOrderId(orderId);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeReview(@RequestParam Long orderId) {
        try {
            reviewService.removeReview(orderId);
            return ResponseEntity.ok("Review for order:" + orderId+ " removed");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
