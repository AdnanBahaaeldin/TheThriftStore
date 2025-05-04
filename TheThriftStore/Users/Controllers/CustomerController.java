package com.TheThriftStore.TheThriftStore.Users.Controllers;

import com.TheThriftStore.TheThriftStore.Models.Product;
import com.TheThriftStore.TheThriftStore.Users.Services.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/add/balance")
    public String addBalance(@PathVariable Double balance){
        customerService.addBalance(balance);
        return balance + " EGP Added successfully!";
    }

    // Add Product to customer
    @PostMapping("/addProduct")
    public String addProduct(@RequestBody Product product) {
        try {
            customerService.addProductToCustomer(product);
            return "Product added successfully.";
        }catch (Exception e) {
            e.getMessage();
            return "Error occured while adding product.";
        }

    }

    // Remove Product from customer
    @DeleteMapping("/removeProduct/{customerProductId}")
    public String removeProduct(@PathVariable Long customerProductId) {
        customerService.removeCustomerProduct(customerProductId);
        return "Product removed successfully.";
    }

    // Update Product for customer
    @PutMapping("/updateProduct/{customerProductId}")
    public String updateProduct(@PathVariable Long customerProductId, @RequestBody Product product) {
        customerService.updateCustomerProduct(customerProductId, product);
        return "Product updated successfully.";
    }
}
