package com.online.TheThriftStore.Users.Services;

import com.online.TheThriftStore.Users.Models.Customer;
import com.online.TheThriftStore.Users.Models.Product;
import com.online.TheThriftStore.Users.Models.Users;
import com.online.TheThriftStore.Users.Repositories.CustomerRepo;

import com.online.TheThriftStore.Authentication.Utilities.SecurityUtils;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class CustomerService {

    @Autowired
    private ProductService productService;

    @Autowired
    private CustomerProductService customerProductService;

    @Autowired
    private CustomerRepo customerRepository;


    public void setCustomerLastLogin(Users user) {
        Customer customer = customerRepository.findById(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found with ID: " + user.getId()));

        customer.setLastLogin(LocalDateTime.now());
        customerRepository.save(customer);
    }


    public void addProductToCustomer(Product product) {
        Long customerId = SecurityUtils.getCurrentUserId();
        Customer customer;
        try {
            customer = customerRepository.findById(customerId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
        }catch (Exception e) {
            e.getMessage();
            return;
        }

        Product savedProduct = productService.addProduct(product);
        customerProductService.linkCustomerToProduct(customer, savedProduct);
    }


    public void removeCustomerProduct(Long customerProductId) {
        customerProductService.removeCustomerProduct(customerProductId);
    }

    public void updateCustomerProduct(Long customerProductId, Product updatedProduct) {
        customerProductService.updateCustomerProduct(customerProductId, updatedProduct);
    }
}
