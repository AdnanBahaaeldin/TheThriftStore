package com.TheThriftStore.TheThriftStore.Order.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.TheThriftStore.TheThriftStore.Models.*;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.*;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;

import static java.lang.Math.max;

@Service
public class OrderService {

    private final PrimaryOrderRepository primaryOrderRepository;

    private final SecondaryOrderRepository secondaryOrderRepository;

    private final PrimaryOrderHistoryRepo primaryOrderHistoryRepo;

    private final SecondaryOrderHistoryRepo secondaryOrderHistoryRepo;

    private final PrimaryCustomerRepo primaryCustomerRepo;

    private final SecondaryCustomerRepo secondaryCustomerRepo;

    private final PrimaryCartItemRepo primaryCartItemRepo;

    private final SecondaryCartItemRepo secondaryCartItemRepo;

    private final PrimaryCustomerProductRepo primaryCustomerProductRepo;

    private final SecondaryCustomerProductRepo secondaryCustomerProductRepo;

    private final PrimaryProductRepo primaryProductRepo;

    private final SecondaryProductRepo secondaryProductRepo;

    @Autowired
    public OrderService(PrimaryOrderRepository primaryOrderRepository,
                        SecondaryOrderRepository secondaryOrderRepository,
                        PrimaryOrderHistoryRepo primaryOrderHistoryRepo,
                        SecondaryOrderHistoryRepo secondaryOrderHistoryRepo,
                        PrimaryCustomerRepo primaryCustomerRepo,
                        SecondaryCustomerRepo secondaryCustomerRepo,
                        PrimaryCartItemRepo primaryCartItemRepo,
                        SecondaryCartItemRepo secondaryCartItemRepo, PrimaryCustomerProductRepo primaryCustomerProductRepo, SecondaryCustomerProductRepo secondaryCustomerProductRepo, PrimaryProductRepo primaryProductRepo, SecondaryProductRepo secondaryProductRepo) {
        this.primaryOrderRepository = primaryOrderRepository;
        this.secondaryOrderRepository = secondaryOrderRepository;
        this.primaryOrderHistoryRepo = primaryOrderHistoryRepo;
        this.secondaryOrderHistoryRepo = secondaryOrderHistoryRepo;
        this.primaryCustomerRepo = primaryCustomerRepo;
        this.secondaryCustomerRepo = secondaryCustomerRepo;
        this.primaryCartItemRepo = primaryCartItemRepo;
        this.secondaryCartItemRepo = secondaryCartItemRepo;
        this.primaryCustomerProductRepo = primaryCustomerProductRepo;
        this.secondaryCustomerProductRepo = secondaryCustomerProductRepo;
        this.primaryProductRepo = primaryProductRepo;
        this.secondaryProductRepo = secondaryProductRepo;
    }


    @Transactional
    public void createOrder(Long customerId) throws Exception {
        Long maxIdOrder = max(primaryOrderRepository.getLastAddedId(), secondaryOrderRepository.getLastAddedId());
        Customer customer;
        List<CartItem> cartItems;
        if(customerId %2 !=0) {
            customer = primaryCustomerRepo.findById(customerId).orElseThrow(()-> new RuntimeException("Customer Not Found!"));
            cartItems = primaryCartItemRepo.findAllByCustomerId(customerId);
        }else {
            customer = secondaryCustomerRepo.findById(customerId).orElseThrow(()-> new RuntimeException("Customer Not Found!"));
            cartItems = secondaryCartItemRepo.findAllByCustomerId(customerId);
        }

        if (cartItems.isEmpty()) {
            throw new Exception("Cart is empty");
        }

        Double totalAmount = 0.0;
        for (CartItem item : cartItems) {
            Long id = item.getCustomerProductId();
            CustomerProduct customerProduct;
            if(id %2 != 0) {
                customerProduct =  primaryCustomerProductRepo.findById(id).orElseThrow(
                        ()-> new RuntimeException("Product doesn't exist!")
                );
            }else {
                customerProduct =  secondaryCustomerProductRepo.findById(id).orElseThrow(
                        ()-> new RuntimeException("Product doesn't exist!")
                );
            }

            Long pId = customerProduct.getProductId();
            Product product;
            if(pId %2 != 0) {
                product =  primaryProductRepo.findById(id).orElseThrow(
                        ()-> new RuntimeException("Product doesn't exist!")
                );
            }else {
                product =  secondaryProductRepo.findById(id).orElseThrow(
                        ()-> new RuntimeException("Product doesn't exist!")
                );
            }

            Double price = product.getPrice();

            int quantity = item.getQuantity();
            totalAmount = totalAmount+ (price * quantity);
        }

        if (customer.getBalance().compareTo(totalAmount) < 0) {
            throw new Exception("Insufficient balance");
        }

        // Deduct from buyer
        customer.setBalance(customer.getBalance() - (totalAmount));
        if(customerId %2 !=0) {
             primaryCustomerRepo.save(customer);
        }else {
            secondaryCustomerRepo.save(customer);
        }

        // Pay sellers
        for (CartItem item : cartItems) {
            Long cpId = item.getCustomerProductId();
            CustomerProduct cp;
            if(cpId %2 != 0) {
                cp =  primaryCustomerProductRepo.findById(cpId).orElseThrow();
            }else {
                cp =  secondaryCustomerProductRepo.findById(cpId).orElseThrow();
            }

            Long sellerId = cp.getCustomerId();
            Customer seller;
            if(sellerId %2 != 0) {
                seller = primaryCustomerRepo.findById(sellerId).orElseThrow();
            }else {
                seller = secondaryCustomerRepo.findById(sellerId).orElseThrow();
            }

            Long pId = cp.getProductId();
            Product pr;
            if(pId %2 != 0) {
                pr = primaryProductRepo.findById(pId).orElseThrow();
            }else {
                pr = secondaryProductRepo.findById(pId).orElseThrow();
            }

            Double amount = (pr.getPrice())*(item.getQuantity());
            seller.setBalance(seller.getBalance() + amount);

            if(seller.getId() %2 !=0) {
                primaryCustomerRepo.save(seller);
            }else {
                secondaryCustomerRepo.save(seller);
            }
        }

        // Create Order
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(totalAmount);
        order.setStatus("completed");
        order.setCustomerId(customer.getId());

        //Create order history
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setOrderId(order.getOrderId());
        orderHistory.setCustomerId(customer.getId());
        //order.setAddress(customer.getAddress().get(0)); // Optional

        if(customerId %2 !=0) {
            primaryOrderRepository.save(order);
            primaryCartItemRepo.deleteAllByCustomerId(customerId);
            primaryOrderHistoryRepo.save(orderHistory);
        }else {
            secondaryOrderRepository.save(order);
            secondaryCartItemRepo.deleteAllByCustomerId(customerId);
            secondaryOrderHistoryRepo.save(orderHistory);
        }


        // Clear cart

    }

    public void cancelOrder(Long orderId) throws Exception {
        Order order;
        order = primaryOrderRepository.findById(orderId)
                .orElseGet(() -> secondaryOrderRepository.findById(orderId).orElse(null));
        if(order == null) {
            throw new RuntimeException("Order doesn't exist!");
        }

        if ("completed".equalsIgnoreCase(order.getStatus())) {
            throw new Exception("Cannot cancel a completed order");
        }

        Long custId = order.getCustomerId();

        if(custId %2 !=0) {
            primaryOrderRepository.delete(order);
        }else {
            secondaryOrderRepository.delete(order);
        }
    }

}