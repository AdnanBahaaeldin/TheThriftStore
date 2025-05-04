package com.TheThriftStore.TheThriftStore.SecondaryRepositories;

import com.TheThriftStore.TheThriftStore.Models.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SecondaryProductRepo extends JpaRepository<Product, Long> {

    /*Added For searching Functionality */
    @Query("SELECT p FROM Product p WHERE " +
          "LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
          "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProductsFromProductTable(@Param("keyword") String keyword);

    @Query("SELECT p FROM Product p WHERE p.categoryName = LOWER(:categoryName)")
    List<Product> findProductsByCategoryName(@Param("categoryName") String categoryName);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.productId = :productId")
    void deleteProductById(@Param("productId") Long productId);

    @Query(value = "SELECT ISNULL(MAX(product_id), 0) FROM product", nativeQuery = true)
    Long getLastAddedId();
}
