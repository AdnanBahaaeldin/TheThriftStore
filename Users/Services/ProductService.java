package com.online.TheThriftStore.Users.Services;

import com.online.TheThriftStore.Users.Models.Product;
import com.online.TheThriftStore.Users.Repositories.ProductRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepository;

    public List<Product> getProductsByPage(int pageIndex, int pageSize) {
        return productRepository.findAll(PageRequest.of(pageIndex, pageSize)).getContent();
    }

    public Product addProduct(Product product) {
        // This function inserts a new product into the 'product' table
        return productRepository.save(product);
    }

}
