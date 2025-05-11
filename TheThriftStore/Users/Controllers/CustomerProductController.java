package com.TheThriftStore.TheThriftStore.Users.Controllers;

import com.TheThriftStore.TheThriftStore.DTOS.CustomerProductDto;
import com.TheThriftStore.TheThriftStore.Models.CustomerProduct;
import com.TheThriftStore.TheThriftStore.Models.Product;
import com.TheThriftStore.TheThriftStore.Users.Services.CustomerProductService;
import com.TheThriftStore.TheThriftStore.Users.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/customer/products")
public class CustomerProductController {

    @Autowired
    private CustomerProductService customerProductService;

    @GetMapping("/getAll")
    public List<CustomerProductDto> getAllProducts() {
        try{
            return customerProductService.getProductsByPage();
        }catch (Exception e){
            e.printStackTrace();
            return new ArrayList<CustomerProductDto>();
        }

    }

    @GetMapping("/get")
    public List<CustomerProductDto> getProductsForUser(){
        return customerProductService.getProductsForUser();
    }

    @GetMapping("/get/product")
    public Product getProductById(@RequestParam long customerProductId){
        return  customerProductService.getProductById(customerProductId);
    }

}
