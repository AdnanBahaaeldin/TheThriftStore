package com.TheThriftStore.TheThriftStore.PrimaryRepositories;

import com.TheThriftStore.TheThriftStore.Models.Review;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PrimaryReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE r.orderId = :orderId")
    Review findByOrderId(@Param("orderId") Long orderId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Review r WHERE r.orderId = :orderId")
    void deleteByOrderId(@Param("orderId") Long orderId);

    @Query(value = "SELECT ISNULL(MAX(review_id), 0) FROM review", nativeQuery = true)
    Long getLastAddedId();
}
