package com.online.TheThriftStore2.Repository;


import com.online.TheThriftStore2.Model.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderHistoryRepo extends JpaRepository<OrderHistory, Integer> {
}
