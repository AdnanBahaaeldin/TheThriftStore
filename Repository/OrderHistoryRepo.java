package com.online.TheThriftStore.Repository;


import com.online.TheThriftStore.Model.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderHistoryRepo extends JpaRepository<OrderHistory, Integer> {
}
