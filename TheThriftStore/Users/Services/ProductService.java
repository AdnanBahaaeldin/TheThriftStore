package com.TheThriftStore.TheThriftStore.Users.Services;

import com.TheThriftStore.TheThriftStore.Models.CustomerProduct;
import com.TheThriftStore.TheThriftStore.Models.Product;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryCustomerProductRepo;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryProductRepo;

import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryCustomerProductRepo;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.max;

@Service
public class ProductService {

    private final PrimaryProductRepo primaryProductRepo;

    private final SecondaryProductRepo secondaryProductRepo;

    private final PrimaryCustomerProductRepo primaryCustomerProductRepo;

    private final SecondaryCustomerProductRepo secondaryCustomerProductRepo;

    @Autowired
    public ProductService(PrimaryProductRepo primaryProductRepo,
                          SecondaryProductRepo secondaryProductRepo,
                          PrimaryCustomerProductRepo primaryCustomerProductRepo,
                          SecondaryCustomerProductRepo secondaryCustomerProductRepo) {
        this.primaryProductRepo = primaryProductRepo;
        this.secondaryProductRepo = secondaryProductRepo;
        this.primaryCustomerProductRepo = primaryCustomerProductRepo;
        this.secondaryCustomerProductRepo = secondaryCustomerProductRepo;
    }

    public Product addProduct(Product product) {
        // This function inserts a new product into the 'product' table
        Long maxPID = max(primaryProductRepo.getLastAddedId(),secondaryProductRepo.getLastAddedId());
        product.setProductId(maxPID+1);

        if(maxPID %2 != 0){
            secondaryProductRepo.save(product);
        }else {
            primaryProductRepo.save(product);
        }

        return product;
    }

    public CustomerProduct isProductAvailable(Long productId) {
        CustomerProduct customerProduct;
        customerProduct = primaryCustomerProductRepo.isProductActive(productId);
        if(customerProduct == null){
            customerProduct =  secondaryCustomerProductRepo.isProductActive(productId);
        }
        return customerProduct;
    }

    public List<CustomerProduct> searchProducts(String keyword) {
        List<Product> allProducts = primaryProductRepo.searchProductsFromProductTable(keyword);
        allProducts.addAll(secondaryProductRepo.searchProductsFromProductTable(keyword));

        List<CustomerProduct> availableSearchedProducts = new ArrayList<>();
        CustomerProduct customerProduct;
        for (int i = 0; i < allProducts.size(); i++) {
            customerProduct = isProductAvailable(allProducts.get(i).getProductId());
            if (customerProduct != null) {
                availableSearchedProducts.add(customerProduct);
            } else {
                if(allProducts.get(i).getProductId()%2 != 0) {
                    primaryProductRepo.deleteProductById(allProducts.get(i).getProductId());
                }else {
                    secondaryProductRepo.deleteProductById(allProducts.get(i).getProductId());
                }
            }
        }
        return availableSearchedProducts;
    }

    public List<CustomerProduct> getProductsByCategoryName(String categoryName) {
        List<Product> list = primaryProductRepo.findProductsByCategoryName(categoryName);
        list.addAll(secondaryProductRepo.findProductsByCategoryName(categoryName));

        List<CustomerProduct> returnList = new ArrayList<>();
        CustomerProduct customerProduct;
        for (int i = 0; i < list.size(); i++) {
            customerProduct = isProductAvailable(list.get(i).getProductId());
            if (customerProduct != null) {
                returnList.add(customerProduct);
            } else {
                if(list.get(i).getProductId()%2 != 0) {
                    primaryProductRepo.deleteProductById(list.get(i).getProductId());
                }else {
                    secondaryProductRepo.deleteProductById(list.get(i).getProductId());
                }
            }
        }
        return returnList;
    }

}
