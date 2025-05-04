package com.TheThriftStore.TheThriftStore.SecondaryRepositories;


import com.TheThriftStore.TheThriftStore.Models.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecondaryOrderHistoryRepo extends JpaRepository<OrderHistory, Long> {

    List<OrderHistory> findAllByCustomerId(Long customerId);

}
