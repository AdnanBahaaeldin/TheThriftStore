package com.online.TheThriftStore.Users.Repositories;

import com.online.TheThriftStore.Users.Models.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customer,Long> {

}
