package com.online.TheThriftStore.Users.Repositories;

import com.online.TheThriftStore.Users.Models.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Long> {

    /*Added For searching Functionality */
    @Query("SELECT p FROM Product p WHERE " +
          "LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
          "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProductsFromProductTable(@Param("keyword") String keyword);
    
    @Query("SELECT p FROM Product p WHERE p.categoryId = " + 
           "(SELECT c.categoryId FROM Category c WHERE LOWER(c.categoryName) = LOWER(:categoryName))")
    List<Product> findProductsByCategoryName(@Param("categoryName") String categoryName);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.productId = :productId")
    void deleteProductById(@Param("productId") Long productId);
}
