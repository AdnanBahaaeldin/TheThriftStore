package com.online.TheThriftStore.Users.Repositories;

import com.online.TheThriftStore.Users.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Long> {
}
