package com.TheThriftStore.TheThriftStore.Users.Controllers;

import com.TheThriftStore.TheThriftStore.Models.Customer;
import com.TheThriftStore.TheThriftStore.Models.Product;
import com.TheThriftStore.TheThriftStore.Users.Services.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/add/balance")
    public String addBalance(@RequestBody Double balance){
        customerService.addBalance(balance);
        return balance + " EGP Added successfully!";
    }

    // Add Product to customer
    @PostMapping("/addProduct")
    public Long addProduct(@RequestPart Product product, @RequestPart MultipartFile imageFile) {
        try {

            return customerService.addProductToCustomer(product,imageFile);

        }catch (Exception e) {
            e.getMessage();
            return -1L;
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

    @GetMapping("/image")
    public ResponseEntity<byte[]> getImageById() {
        try {
            byte[] imageData = customerService.getImage();
            return ResponseEntity.ok(imageData);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new byte[0]);
        }
    }

    @PutMapping ("/update/image")
    public ResponseEntity<String> updateProfileImage(@RequestBody MultipartFile imageFile){
        try {
            customerService.updateProfileImage(imageFile);
            return ResponseEntity.ok("Image updated successfully!");
        }catch (Exception e) {
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
