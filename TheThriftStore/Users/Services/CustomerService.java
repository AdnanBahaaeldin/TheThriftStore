package com.TheThriftStore.TheThriftStore.Users.Services;

import com.TheThriftStore.TheThriftStore.Models.Customer;
import com.TheThriftStore.TheThriftStore.Models.Product;


import java.time.LocalDateTime;

import com.TheThriftStore.TheThriftStore.Models.Users;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryCustomerRepo;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryCustomerRepo;
import com.TheThriftStore.TheThriftStore.Utility.SecurityUtils;
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
    private PrimaryCustomerRepo primaryCustomerRepo;

    @Autowired
    private SecondaryCustomerRepo secondaryCustomerRepo;

    public void setCustomerLastLogin(Users user) {
        if(user.getId()%2 != 0) {
            Customer customer = primaryCustomerRepo.findById(user.getId())
                    .orElseThrow(() -> new RuntimeException("Customer Not Found"));

            customer.setLastLogin(LocalDateTime.now());
            primaryCustomerRepo.save(customer);
        }else {
            Customer customer = secondaryCustomerRepo.findById(user.getId())
                    .orElseThrow(() -> new RuntimeException("Customer Not Found"));

            customer.setLastLogin(LocalDateTime.now());
            secondaryCustomerRepo.save(customer);
        }
    }

    public void addProductToCustomer(Product product) {
        Long customerId = SecurityUtils.getCurrentUserId();
        Customer customer;
        if(customerId%2 != 0) {
            try {
                customer = primaryCustomerRepo.findById(customerId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
            }catch (Exception e) {
                e.getMessage();
                return;
            }
        }else {
            try {
                customer = secondaryCustomerRepo.findById(customerId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
            }catch (Exception e) {
                e.getMessage();
                return;
            }
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


    public void addBalance(Double balance) {
        Long customerId = SecurityUtils.getCurrentUserId();
        Customer customer;
        if(balance <= 0){
            throw new RuntimeException("Balance can't be negative");
        }

        if(customerId%2 != 0) {
            try {
                customer = primaryCustomerRepo.findById(customerId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
                customer.setBalance(balance);
                primaryCustomerRepo.save(customer);
            }catch (Exception e) {
                e.getMessage();
                return;
            }
        }else {
            try {
                customer = secondaryCustomerRepo.findById(customerId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
                customer.setBalance(balance);
                secondaryCustomerRepo.save(customer);
            }catch (Exception e) {
                e.getMessage();
                return;
            }
        }
    }
}
