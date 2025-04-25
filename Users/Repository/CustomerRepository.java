package com.Adnan.SpringSecurity.Users.Repository;

import com.Adnan.SpringSecurity.Users.Models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
