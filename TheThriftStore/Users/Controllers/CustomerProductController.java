package com.TheThriftStore.TheThriftStore.Users.Controllers;

import com.TheThriftStore.TheThriftStore.Models.CustomerProduct;
import com.TheThriftStore.TheThriftStore.Models.Product;
import com.TheThriftStore.TheThriftStore.Users.Services.CustomerProductService;
import com.TheThriftStore.TheThriftStore.Users.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer/products")
public class CustomerProductController {

    @Autowired
    private CustomerProductService customerProductService;

    @GetMapping
    public List<CustomerProduct> getAllProducts(@RequestParam(defaultValue = "0") int page_index) {
        return customerProductService.getProductsByPage(page_index, 8);
    }





}
