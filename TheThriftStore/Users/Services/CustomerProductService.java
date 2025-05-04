package com.TheThriftStore.TheThriftStore.Users.Services;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryCustomerProductRepo;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.TheThriftStore.TheThriftStore.Models.Customer;
import com.TheThriftStore.TheThriftStore.Models.CustomerProduct;
import com.TheThriftStore.TheThriftStore.Models.Product;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryCustomerProductRepo;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryProductRepo;

import jakarta.transaction.Transactional;

import java.util.List;

import static java.lang.Math.max;


@Service
public class CustomerProductService {


    private final PrimaryCustomerProductRepo primaryCustomerProductRepo;

    private final SecondaryCustomerProductRepo secondaryCustomerProductRepo;
    private final PrimaryProductRepo primaryProductRepo;
    private final SecondaryProductRepo secondaryProductRepo;

    @Autowired
    public CustomerProductService(PrimaryCustomerProductRepo primaryCustomerProductRepo,
                                  SecondaryCustomerProductRepo secondaryCustomerProductRepo,
                                  PrimaryProductRepo primaryProductRepo,
                                  SecondaryProductRepo secondaryProductRepo) {
        this.primaryCustomerProductRepo = primaryCustomerProductRepo;
        this.secondaryCustomerProductRepo = secondaryCustomerProductRepo;
        this.primaryProductRepo = primaryProductRepo;
        this.secondaryProductRepo = secondaryProductRepo;
    }

    public List<CustomerProduct> getProductsByPage(int pageIndex, int pageSize) {
        List<CustomerProduct> list = primaryCustomerProductRepo.findAll(PageRequest.of(pageIndex, (pageSize+1)/2)).getContent();
        list.addAll(secondaryCustomerProductRepo.findAll(PageRequest.of(pageIndex, pageSize-list.size())).getContent());
        return list;
    }

    public void linkCustomerToProduct(Customer customer, Product product) {
        CustomerProduct customerProduct = new CustomerProduct();
        customerProduct.setCustomerId(customer.getId());
        customerProduct.setProductId(product.getProductId());
        customerProduct.setQuantity(product.getQuantity());
        customerProduct.setStatus(CustomerProduct.Status.AVAILABLE);
        Long maxId = max(primaryCustomerProductRepo.getLastAddedId(), secondaryCustomerProductRepo.getLastAddedId());
        if(maxId%2 !=0) {
            customerProduct.setCustomerProductId(maxId+1);
            secondaryCustomerProductRepo.save(customerProduct);
        }else {
            customerProduct.setCustomerProductId(maxId+1);
            primaryCustomerProductRepo.save(customerProduct);
        }
    }

    public void removeCustomerProduct(Long customerProductId) {

        if (!primaryCustomerProductRepo.existsById(customerProductId) &&
                !secondaryCustomerProductRepo.existsById(customerProductId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "CustomerProduct not found");
        }

        if(customerProductId%2 !=0) {
            primaryCustomerProductRepo.deleteById(customerProductId);
        }else {
            secondaryCustomerProductRepo.deleteById(customerProductId);
        }

    }

    @Transactional
    public void updateCustomerProduct(Long customerProductId, Product updatedProduct) {
        CustomerProduct customerProduct;

        if (customerProductId % 2 != 0) {
            customerProduct = primaryCustomerProductRepo.findById(customerProductId).orElseThrow(()
                    -> new RuntimeException("Item Doesn't exist"));
        }else {
            customerProduct = secondaryCustomerProductRepo.findById(customerProductId).orElseThrow(()
                    -> new RuntimeException("Item Doesn't exist"));
        }
        Long pId = customerProduct.getProductId();

        Product existingProduct;
        if(pId %2 !=0) {
            existingProduct = primaryProductRepo.findById(pId).orElseThrow();
        }else {
            existingProduct = secondaryProductRepo.findById(pId).orElseThrow();
        }

        if (existingProduct == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No associated product");
        }

        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setImageURL(updatedProduct.getImageURL());
        existingProduct.setQuantity(updatedProduct.getQuantity());
        existingProduct.setPrice(updatedProduct.getPrice());

        customerProduct.setProductId(existingProduct.getProductId());
        customerProduct.setQuantity(updatedProduct.getQuantity());
        CustomerProduct.Status status = (customerProduct.getQuantity() > 0 )? CustomerProduct.Status.AVAILABLE : CustomerProduct.Status.SOLD;
        customerProduct.setStatus(status);

        if(existingProduct.getProductId() %2 != 0 ){
            primaryProductRepo.save(existingProduct);
        }else {
            secondaryProductRepo.save(existingProduct);
        }

        if(customerProductId %2 != 0) {
            primaryCustomerProductRepo.save(customerProduct);
        }else {
            secondaryCustomerProductRepo.save(customerProduct);
        }

    }
}
