package com.online.TheThriftStore2.Service;


import com.online.TheThriftStore2.*;
import com.online.TheThriftStore2.Model.*;
import com.online.TheThriftStore2.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InfoService {
    @Autowired
    private OrderHistoryRepo orderRepo;
    @Autowired
    private CustomerRepo customerRepo; // connect to customerRepo
    @Autowired
    private CustomerProductRepo productRepo;
    public double getBalance(int customerId) {
        try {
            return customerRepo.findById(customerId).orElse(null).getBalance();
        }catch (Exception e) {
            return -1;
        }
    }

    public ArrayList<Order> getOrders(int customerId) {
        ArrayList<Order> orders = new ArrayList<>() ;
        List<OrderHistory> OH =orderRepo.findAll();
        int orderCount = orderRepo.findAll().size();
        for(int i = 0 ; i < orderCount ; i++) {
            if(OH.get(i).getCustomer().getId() == customerId) {
                orders.add(OH.get(i).getOrder());
            }
        }
        return orders ;
    }
    public ArrayList<Product> getProducts(int customerId) {
        ArrayList<Product> products = new ArrayList<>() ;
        List<CustomerProduct> CP =productRepo.findAll();
        int orderCount = productRepo.findAll().size();
        for(int i = 0 ; i < orderCount ; i++) {
            if(CP.get(i).getCustomer().getId() == customerId) {
                products.add(CP.get(i).getProduct());
            }
        }
        return products;
    }
}
