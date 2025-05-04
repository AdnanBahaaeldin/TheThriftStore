package com.TheThriftStore.TheThriftStore.PrimaryRepositories;


import com.TheThriftStore.TheThriftStore.Models.CartItem;
import com.TheThriftStore.TheThriftStore.Models.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrimaryOrderHistoryRepo extends JpaRepository<OrderHistory, Long> {


    List<OrderHistory> findAllByCustomerId(Long customerId);

}
