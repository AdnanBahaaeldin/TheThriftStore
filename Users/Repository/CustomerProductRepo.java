package com.online.TheThriftStore.Users.Repositories;

import com.online.TheThriftStore.Users.Models.CustomerProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerProductRepo extends JpaRepository<CustomerProduct, Long> {

    @Query("SELECT CASE WHEN COUNT(cp) > 0 THEN true ELSE false END FROM CustomerProduct cp WHERE cp.productId = :productId")
    boolean isProductActive(@Param("productId") Long productId);

}
