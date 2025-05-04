package com.TheThriftStore.TheThriftStore.SecondaryRepositories;

import com.TheThriftStore.TheThriftStore.Models.CustomerProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecondaryCustomerProductRepo extends JpaRepository<CustomerProduct, Long> {

    @Query("SELECT cp FROM CustomerProduct cp WHERE cp.productId = :productId")
    CustomerProduct isProductActive(@Param("productId") Long productId);


    @Query(value = "SELECT ISNULL(MAX(customer_product_id), 0) FROM customer_product", nativeQuery = true)
    Long getLastAddedId();

    List<CustomerProduct> findAllByCustomerId(Long CustomerId);

}
