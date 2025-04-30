package com.online.TheThriftStore.Users.Repositories;

import com.online.TheThriftStore.Users.Models.CustomerProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerProductRepo extends JpaRepository<CustomerProduct, Long> {

}
