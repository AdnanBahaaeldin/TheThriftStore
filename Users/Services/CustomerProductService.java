package com.online.TheThriftStore.Users.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.online.TheThriftStore.Users.Models.Customer;
import com.online.TheThriftStore.Users.Models.CustomerProduct;
import com.online.TheThriftStore.Users.Models.Product;
import com.online.TheThriftStore.Users.Repositories.CustomerProductRepo;
import com.online.TheThriftStore.Users.Repositories.ProductRepo;

import jakarta.transaction.Transactional;


@Service
public class CustomerProductService {

    @Autowired
    private CustomerProductRepo customerProductRepository;

    @Autowired
    private ProductRepo productRepository;

    public void linkCustomerToProduct(Customer customer, Product product) {
        CustomerProduct customerProduct = new CustomerProduct();
        customerProduct.setCustomer(customer);
        customerProduct.setProduct(product);
        customerProduct.setQuantity(product.getQuantity());
        customerProduct.setStatus(CustomerProduct.Status.AVAILABLE);
        customerProductRepository.save(customerProduct);
    }

    public void removeCustomerProduct(Long customerProductId) {
        if (!customerProductRepository.existsById(customerProductId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "CustomerProduct not found");
        }
        customerProductRepository.deleteById(customerProductId);
    }

    @Transactional
    public void updateCustomerProduct(Long customerProductId, Product updatedProduct) {
        CustomerProduct customerProduct = customerProductRepository.findById(customerProductId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "CustomerProduct not found"));

        Product existingProduct = customerProduct.getProduct();
        if (existingProduct == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No associated product");
        }

        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setImageURL(updatedProduct.getImageURL());
        existingProduct.setQuantity(updatedProduct.getQuantity());
        existingProduct.setPrice(updatedProduct.getPrice());

        customerProduct.setProduct(existingProduct);
        customerProduct.setQuantity(updatedProduct.getQuantity());
        CustomerProduct.Status status = (customerProduct.getQuantity() > 0 )? CustomerProduct.Status.AVAILABLE : CustomerProduct.Status.SOLD;
        customerProduct.setStatus(status);

        productRepository.save(existingProduct);
        customerProductRepository.save(customerProduct);
    }
}
