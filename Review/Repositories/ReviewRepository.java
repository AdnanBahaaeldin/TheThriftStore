package com.online.TheThriftStore.Repositories;

import com.online.TheThriftStore.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review findByOrderId(Long orderId);
    void deleteByOrderId(Long orderId);
}
