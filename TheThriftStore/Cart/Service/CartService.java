package com.TheThriftStore.TheThriftStore.Cart.Service;

import com.TheThriftStore.TheThriftStore.Models.CartItem;

import com.TheThriftStore.TheThriftStore.Models.Customer;
import com.TheThriftStore.TheThriftStore.Models.CustomerProduct;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryCartItemRepo;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryCustomerProductRepo;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryCustomerRepo;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryCartItemRepo;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryCustomerProductRepo;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryCustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final PrimaryCartItemRepo primaryCartItemRepo;
    private final SecondaryCartItemRepo secondaryCartItemRepo;

    private final PrimaryCustomerRepo primaryCustomerRepo;

    private final SecondaryCustomerRepo secondaryCustomerRepo;

    private final PrimaryCustomerProductRepo primaryCustomerProductRepo;

    private final SecondaryCustomerProductRepo secondaryCustomerProductRepo;

    @Autowired
    public CartService(PrimaryCartItemRepo primaryCartItemRepo,
                       SecondaryCartItemRepo secondaryCartItemRepo,
                       PrimaryCustomerRepo primaryCustomerRepo,
                       SecondaryCustomerRepo secondaryCustomerRepo,
                       PrimaryCustomerProductRepo primaryCustomerProductRepo,
                       SecondaryCustomerProductRepo secondaryCustomerProductRepo) {
        this.primaryCartItemRepo = primaryCartItemRepo;
        this.secondaryCartItemRepo = secondaryCartItemRepo;
        this.primaryCustomerRepo = primaryCustomerRepo;
        this.secondaryCustomerRepo = secondaryCustomerRepo;
        this.primaryCustomerProductRepo = primaryCustomerProductRepo;
        this.secondaryCustomerProductRepo = secondaryCustomerProductRepo;
    }


    public void addItemToCart(Long customerId, Long customer_product_Id, int quantity) {


        Customer customer;
        CustomerProduct customerProduct;
        if(customerId %2 !=0) {
            customer = primaryCustomerRepo.findById(customerId).orElseThrow(()-> new RuntimeException("Customer Not Found!"));
        }else {
            customer = secondaryCustomerRepo.findById(customerId).orElseThrow(()-> new RuntimeException("Customer Not Found!"));
        }

        customerProduct = primaryCustomerProductRepo.findById(customer_product_Id).orElseGet(
                () -> secondaryCustomerProductRepo.findById(customer_product_Id).orElse(null));

        if(customerProduct == null){
            throw new RuntimeException("Product Doesn't Exist!");
        }

        if (quantity > customerProduct.getQuantity()) {
            throw new RuntimeException("Not enough quantity available to add to cart");
        }

        Long sellerId = customerProduct.getCustomerId();
        // Decrement available quantity
        customerProduct.setQuantity(customerProduct.getQuantity() - quantity);
        if (customerProduct.getQuantity() == 0) {
            customerProduct.setStatus(CustomerProduct.Status.SOLD);
        }

        if(sellerId %2 != 0) {
            primaryCustomerProductRepo.save(customerProduct);
        }else {
            secondaryCustomerProductRepo.save(customerProduct);
        }

        CartItem cartItem = new CartItem();
        cartItem.setCustomerId(customer.getId());
        cartItem.setQuantity(quantity);
        cartItem.setCustomerProductId(customerProduct.getCustomerProductId());

        if(customerId %2 !=0) {
            primaryCartItemRepo.save(cartItem);
        }else {
            secondaryCartItemRepo.save(cartItem);
        }

    }

    // removes one item from the cart
    public void removeItemFromCart(Long customerId, Long customer_product_Id) {
        CartItem cartItem;
        CustomerProduct customerProduct;
        if(customerId %2 !=0) {
            cartItem = primaryCartItemRepo.findByCustomerProductId(customer_product_Id);

        }else {
            cartItem = secondaryCartItemRepo.findByCustomerProductId(customer_product_Id);
        }

        if(customer_product_Id %2 !=0){
            customerProduct = primaryCustomerProductRepo.findById(customer_product_Id).orElseThrow(
                    ()->new RuntimeException("Product Doesn't Exist!")
            );
        }else {
            customerProduct = secondaryCustomerProductRepo.findById(customer_product_Id).orElseThrow(
                    ()->new RuntimeException("Product Doesn't Exist!")
            );
        }

        // increment the quantity
        customerProduct.setQuantity(customerProduct.getQuantity() + 1);
        if (customerProduct.getQuantity() == 1) {
            customerProduct.setStatus(CustomerProduct.Status.AVAILABLE);
        }

        if(customer_product_Id %2 !=0){
            primaryCustomerProductRepo.save(customerProduct);
        }else {
            secondaryCustomerProductRepo.save(customerProduct);
        }

        // decrement the quantity of the cart item
        cartItem.setQuantity(cartItem.getQuantity() - 1);
        if (cartItem.getQuantity() == 0) {
            if(customerId %2 !=0) {
                primaryCartItemRepo.deleteByCustomerProductId(customer_product_Id);
            }else {
                secondaryCartItemRepo.deleteByCustomerProductId(customer_product_Id);
            }
        } else {
            if(customerId %2 !=0) {
                primaryCartItemRepo.save(cartItem);
            }else {
                secondaryCartItemRepo.save(cartItem);
            }
        }
    }

    public List<CartItem> getAllCartItems(Long customerId) {
        if(customerId %2 !=0) {
           return primaryCartItemRepo.findAllByCustomerId(customerId);

        }else {
            return secondaryCartItemRepo.findAllByCustomerId(customerId);
        }

    }

    public void removeAllCartItems(Long customerId) {
        List<CartItem> items = getAllCartItems(customerId);
        for (CartItem item : items) {
            for (int i = 0; i < item.getQuantity(); i++) {
                removeItemFromCart(customerId, item.getCustomerProductId());
            }
        }
    }
}
