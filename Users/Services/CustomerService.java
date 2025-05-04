package com.Adnan.SpringSecurity.Users.Services;

import com.Adnan.SpringSecurity.Users.Models.Customer;
import com.Adnan.SpringSecurity.Users.Models.Users;
import com.Adnan.SpringSecurity.Users.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService (CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    public void setCustomerLastLogin(Users user) {
        Customer customer = customerRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Customer Not Found"));

        customer.setLastLogin(LocalDateTime.now());
        customerRepository.save(customer);


    }

}
