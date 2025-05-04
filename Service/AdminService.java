package com.online.TheThriftStore2.Service;

import com.online.TheThriftStore2.Model.Customer;
import com.online.TheThriftStore2.Order;
import com.online.TheThriftStore2.Repository.CustomerRepo;
import com.online.TheThriftStore2.Repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.lang.Math.min;

@Service
public class AdminService {
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private CustomerRepo customerRepo;

    public ArrayList<Order> getRecentOrder(LocalDateTime start, LocalDateTime end) {
        List<Order> allOrders = orderRepo.findAll();
        ArrayList<Order> result = new ArrayList<Order>();
        for(Order order :allOrders){
            if ((order.getOrderDate().isEqual(start) || order.getOrderDate().isAfter(start)) &&
                    (order.getOrderDate().isEqual(end) || order.getOrderDate().isBefore(end))) {
                result.add(order);
            }
        }
        return result;
    }

    public ArrayList<Customer> getCurrentLoggedIn( int pgIndex) {
        List<Customer> allCustomers =  customerRepo.findAll();
        ArrayList<Customer> result = new ArrayList<Customer>();
        for(int i=((pgIndex-1)*10);i<min(allCustomers.size(),(pgIndex)*10);i++) {
            if(allCustomers.get(i).getLogintime().isAfter(LocalDateTime.now().minusMinutes(10)))
                result.add(allCustomers.get(i));
        }
        return result;
    }
}
