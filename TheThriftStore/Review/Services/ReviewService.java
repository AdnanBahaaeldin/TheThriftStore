package com.TheThriftStore.TheThriftStore.Review.Services;

import com.TheThriftStore.TheThriftStore.Models.*;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryOrderRepository;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryOrderRepository;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryReviewRepository;

import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryReviewRepository;
import com.TheThriftStore.TheThriftStore.Utility.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import static java.lang.Math.max;

@Service
public class ReviewService {


    private final PrimaryReviewRepository primaryReviewRepository;
    private final SecondaryReviewRepository secondaryReviewRepository;


    private final PrimaryOrderRepository primaryOrderRepository;
    private final SecondaryOrderRepository secondaryOrderRepository;

    @Autowired
    public ReviewService(PrimaryReviewRepository primaryReviewRepository,
                         SecondaryReviewRepository secondaryReviewRepository,
                         PrimaryOrderRepository primaryOrderRepository,
                         SecondaryOrderRepository secondaryOrderRepository) {
        this.primaryReviewRepository = primaryReviewRepository;
        this.secondaryReviewRepository = secondaryReviewRepository;
        this.primaryOrderRepository = primaryOrderRepository;
        this.secondaryOrderRepository = secondaryOrderRepository;
    }


    public Review addReview(Long orderId, String description, Long rate) {
        Optional<Order> optionalOrder;
        Long currentUserId = SecurityUtils.getCurrentUserId();
        if(currentUserId %2 !=0) {
            optionalOrder = primaryOrderRepository.findById(orderId);
        }else {
            optionalOrder = secondaryOrderRepository.findById(orderId);
        }

        if (optionalOrder.isEmpty()) {
            throw new RuntimeException("Order not found");
        }

        Order order = optionalOrder.get();

        Review review = new Review();
        review.setOrderId(order.getOrderId());
        review.setRate(rate);
        review.setDescription(description);
        review.setReviewDate(LocalDateTime.now());

        Long maxId = max(primaryReviewRepository.getLastAddedId(),secondaryReviewRepository.getLastAddedId());

        if(maxId %2 !=0) {
            return secondaryReviewRepository.save(review);
        }else {
            return primaryReviewRepository.save(review);
        }
    }

    public void removeReview(Long orderId) {
        if(orderId %2 ==0) {
             secondaryReviewRepository.deleteByOrderId(orderId);
        }else {
            primaryReviewRepository.deleteByOrderId(orderId);
        }
    }

    public Review getReviewByOrderId(Long orderId) {
        if(orderId %2 ==0) {
            return secondaryReviewRepository.findByOrderId(orderId);
        }else {
            return primaryReviewRepository.findByOrderId(orderId);
        }
    }
}
