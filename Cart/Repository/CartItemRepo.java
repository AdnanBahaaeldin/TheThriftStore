package com.online.TheThriftStore.Repositories;

import com.online.TheThriftStore.Models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {

    List<CartItem> findAllByCustomerId(Long customerId);

    void deleteAllByCustomerId(Long customerId);

    CartItem findByCustomerId(Long customerId);
}
