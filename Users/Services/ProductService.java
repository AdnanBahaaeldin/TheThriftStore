package com.online.TheThriftStore.Users.Services;

import com.online.TheThriftStore.Users.Models.Product;
import com.online.TheThriftStore.Users.Repositories.CustomerProductRepo;
import com.online.TheThriftStore.Users.Repositories.ProductRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private CustomerProductRepo customerProductRepository;

    public List<Product> getProductsByPage(int pageIndex, int pageSize) {
        return productRepository.findAll(PageRequest.of(pageIndex, pageSize)).getContent();
    }

    public Product addProduct(Product product) {
        // This function inserts a new product into the 'product' table
        return productRepository.save(product);
    }

    public boolean isProductAvailable(Long productId) {
        return customerProductRepository.isProductActive(productId);
    }

    public List<Product> searchProducts(String keyword) {
        List<Product> allProducts = repo.searchProductsFromProductTable(keyword);
        List<Product> availableSearchedProducts = new ArrayList<>();
        
        for (int i = 0; i < allProducts.size(); i++) {
            if (isProductAvailable(allProducts.get(i).getProductId())) {
                availableSearchedProducts.add(allProducts.get(i));
            } else {
                // Note: Deleting during search might not be expected behavior
                repo.deleteProductById(allProducts.get(i).getProductId());
            }
        }
        return availableSearchedProducts;
    }

    public List<Product> getProductsByCategoryName(String categoryName) {
        return repo.findProductsByCategoryName(categoryName);
    }

}
