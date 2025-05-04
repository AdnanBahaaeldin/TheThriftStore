package com.TheThriftStore.TheThriftStore.Users.Controllers;
import java.util.List;

import com.TheThriftStore.TheThriftStore.Models.CustomerProduct;
import com.TheThriftStore.TheThriftStore.Models.Product;
import com.TheThriftStore.TheThriftStore.Users.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class productController {
    private final ProductService productService;

    @Autowired
    public productController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<CustomerProduct>> searchProducts(@RequestParam String keyword) {
        List<CustomerProduct> products = productService.searchProducts(keyword);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<CustomerProduct>> getProductsByCategory(@PathVariable String categoryName) {
        List<CustomerProduct> products = productService.getProductsByCategoryName(categoryName);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

}
