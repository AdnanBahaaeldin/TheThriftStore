package com.Thrift_App.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Thrift_App.Model.CartItem;
import com.Thrift_App.Model.Customer;
import com.Thrift_App.Model.Order;
import com.Thrift_App.Repo.CartItemRepository;
import com.Thrift_App.Repo.CustomerRepository;
import com.Thrift_App.Repo.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

   

    @Transactional
    public void createOrder(Long customerId) throws Exception {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new Exception("Customer not found"));

        List<CartItem> cartItems = cartItemRepository.findAllByCustomerId(customerId);
        if (cartItems.isEmpty()) {
            throw new Exception("Cart is empty");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;
        for (CartItem item : cartItems) {
            BigDecimal price = item.getCustomerProduct().getProduct().getPrice();
            int quantity = item.getQuantity();
            totalAmount = totalAmount.add(price.multiply(BigDecimal.valueOf(quantity)));
        }

        if (customer.getBalance().compareTo(totalAmount) < 0) {
            throw new Exception("Insufficient balance");
        }

        // Deduct from buyer
        customer.setBalance(customer.getBalance().subtract(totalAmount));
        customerRepository.save(customer);

        // Pay sellers
        for (CartItem item : cartItems) {
            Customer seller = item.getCustomerProduct().getCustomer();
            BigDecimal amount = item.getCustomerProduct().getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            seller.setBalance(seller.getBalance().add(amount));
            customerRepository.save(seller);
        }

        // Create Order
        Order order = new Order();
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(totalAmount);
        order.setStatus("completed");
        order.setCustomer(customer);
        //order.setAddress(customer.getAddress().get(0)); // Optional

        orderRepository.save(order);

        // TODO: Add entry to OrderHistory (handled externally)

        // Clear cart
        cartItemRepository.deleteAllByCustomerId(customerId);

    }


    public void cancelOrder(Long orderId) throws Exception {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new Exception("Order not found"));

        if ("completed".equalsIgnoreCase(order.getStatus())) {
            throw new Exception("Cannot cancel a completed order");
        }

        orderRepository.delete(order);
    }




}