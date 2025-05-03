package com.online.TheThriftStore.Services;

import com.online.TheThriftStore.Models.Order;
import com.online.TheThriftStore.Models.Review;
import com.online.TheThriftStore.Repositories.OrderRepository;
import com.online.TheThriftStore.Repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Review addReview(Long orderId, String description, Long rate) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (!optionalOrder.isPresent()) {
            throw new RuntimeException("Order not found");
        }

        Order order = optionalOrder.get();

        Review review = new Review();
        review.setOrder(order);
        review.setRate(rate);
        review.setDescription(description);
        review.setReviewDate(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    public void removeReview(Long orderId) {
        reviewRepository.deleteByOrderId(orderId);
    }

    public Review getReviewByOrderId(Long orderId) {
        return reviewRepository.findByOrderId(orderId);
    }
}
