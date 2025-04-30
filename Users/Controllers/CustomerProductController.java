package com.online.TheThriftStore.Users.Controllers;

import com.online.TheThriftStore.Users.Models.Product;
import com.online.TheThriftStore.Users.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer/products")
public class CustomerProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts(@RequestParam(defaultValue = "0") int page_index) {
        return productService.getProductsByPage(page_index, 50);
    }
}
