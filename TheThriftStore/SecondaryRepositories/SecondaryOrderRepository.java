package com.TheThriftStore.TheThriftStore.SecondaryRepositories;

import com.TheThriftStore.TheThriftStore.Models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecondaryOrderRepository extends JpaRepository<Order, Long> {
    @Query(value = "SELECT ISNULL(MAX(order_id), 0) FROM orders", nativeQuery = true)
    Long getLastAddedId();


    List<Order> findByCustomerId(Long customerId);
}