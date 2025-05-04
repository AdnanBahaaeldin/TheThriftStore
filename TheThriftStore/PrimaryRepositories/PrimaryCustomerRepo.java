package com.TheThriftStore.TheThriftStore.PrimaryRepositories;

import com.TheThriftStore.TheThriftStore.Models.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrimaryCustomerRepo extends JpaRepository<Customer,Long> {

}
