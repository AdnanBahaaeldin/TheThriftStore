package com.online.TheThriftStore.Services;

import com.online.TheThriftStore.Models.CartItem;
import com.online.TheThriftStore.Models.CustomerProduct;
import com.online.TheThriftStore.Repositories.CartItemRepo;
import com.online.TheThriftStore.Repositories.CustomerProductRepo;
import com.online.TheThriftStore.Repositories.CustomerRepo;
import com.online.TheThriftStore.Users.Models.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartItemRepo cartItemRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private CustomerProductRepo customerProductRepo;

    public void addItemToCart(Long customerId, int customer_product_Id, int quantity) {
        Customer customer = customerRepo.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found"));

        CustomerProduct customerProduct = customerProductRepo.findById(customer_product_Id).orElseThrow(() -> new RuntimeException("Customer Product not found"));

        if (quantity > customerProduct.getQuantity()) {
            throw new RuntimeException("Not enough quantity available to add to cart");
        }

        CartItem cartItem = new CartItem();
        cartItem.setCustomer(customer);
        cartItem.setQuantity(quantity);
        cartItem.setCustomerProduct(customerProduct);
        cartItemRepo.save(cartItem);

        // Decrement available quantity
        customerProduct.setQuantity(customerProduct.getQuantity() - quantity);
        if (customerProduct.getQuantity() == 0) {
            customerProduct.setStatus(CustomerProduct.Status.SOLD);
        }
        customerProductRepo.save(customerProduct);

    }

    // removes one item from the cart
    public void removeItemFromCart(Long customerId, int customer_product_Id) {
        CartItem cartItem = cartItemRepo.findByCustomerId(customerId);
        CustomerProduct customerProduct = customerProductRepo.findById(customer_product_Id).orElseThrow(() -> new RuntimeException("Customer Product not found"));

        // increment the quantity
        customerProduct.setQuantity(customerProduct.getQuantity() + 1);
        if (customerProduct.getQuantity() == 1) {
            customerProduct.setStatus(CustomerProduct.Status.AVAILABLE);
        }
        customerProductRepo.save(customerProduct);


        // decrement the quantity of the cart item
        cartItem.setQuantity(cartItem.getQuantity() - 1);
        if (cartItem.getQuantity() == 0) {
            cartItemRepo.delete(cartItem);
        } else cartItemRepo.save(cartItem);
    }

    public List<CartItem> getAllCartItems(Long customerId) {
        return cartItemRepo.findAllByCustomerId(customerId);
    }

    public void removeAllCartItems(Long customerId) {
        List<CartItem> items = getAllCartItems(customerId);
        for (CartItem item : items) {
            for (int i = 0; i < item.getQuantity(); i++) {
                removeItemFromCart(customerId, item.getCustomerProduct().getCustomer_product_id());
            }
        }
    }
}
