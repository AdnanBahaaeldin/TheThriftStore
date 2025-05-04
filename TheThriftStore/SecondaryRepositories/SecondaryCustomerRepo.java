package com.TheThriftStore.TheThriftStore.SecondaryRepositories;

import com.TheThriftStore.TheThriftStore.Models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecondaryCustomerRepo extends JpaRepository<Customer,Long> {

}
