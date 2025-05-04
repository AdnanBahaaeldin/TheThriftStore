package com.TheThriftStore.TheThriftStore.SecondaryRepositories;

import com.TheThriftStore.TheThriftStore.Models.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecondaryCartItemRepo extends JpaRepository<CartItem, Long> {

    List<CartItem> findAllByCustomerId(Long customerId);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.customerId = :customerId")
    void deleteAllByCustomerId(Long customerId);

    List<CartItem> findByCustomerId(Long customerId);

    @Query("SELECT c FROM CartItem c WHERE c.customerProductId = :customerProductId")
    CartItem findByCustomerProductId(@Param("customerProductId") Long customerProductId);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.customerProductId = :customerProductId")
    void deleteByCustomerProductId(@Param("customerProductId") Long customerProductId);
}
