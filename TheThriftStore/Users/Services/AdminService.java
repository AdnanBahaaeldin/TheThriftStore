package com.TheThriftStore.TheThriftStore.Users.Services;

import com.TheThriftStore.TheThriftStore.Models.*;
import com.TheThriftStore.TheThriftStore.Models.*;

import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryAdminRepository;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryCustomerProductRepo;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryCustomerRepo;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryOrderRepository;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryAdminRepository;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryCustomerRepo;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDate;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.min;

@Service
public class AdminService {

    private final PrimaryOrderRepository primaryOrderRepository;


    private final SecondaryOrderRepository secondaryOrderRepository;


    private final PrimaryCustomerRepo primaryCustomerRepo;


    private final SecondaryCustomerRepo secondaryCustomerRepo;


    private final PrimaryAdminRepository primaryAdminRepository;

    private final SecondaryAdminRepository secondaryAdminRepository;

    @Autowired
    public AdminService (PrimaryOrderRepository primaryOrderRepository,
                         SecondaryOrderRepository secondaryOrderRepository,
                         PrimaryCustomerRepo primaryCustomerRepo,
                         SecondaryCustomerRepo secondaryCustomerRepo,
                         PrimaryAdminRepository primaryAdminRepository,
                         SecondaryAdminRepository secondaryAdminRepository) {

        this.primaryOrderRepository = primaryOrderRepository;
        this.secondaryOrderRepository = secondaryOrderRepository;
        this.primaryCustomerRepo = primaryCustomerRepo;

        this.secondaryCustomerRepo = secondaryCustomerRepo;
        this.primaryAdminRepository = primaryAdminRepository;
        this.secondaryAdminRepository = secondaryAdminRepository;
    }

    public void setStatus (Users user){
        if(user.getId()%2 != 0) {
            Admin admin = primaryAdminRepository.findById(user.getId()).orElseThrow(
                    () -> new RuntimeException("User doesn't exist"));

            admin.setActive(true);
            primaryAdminRepository.save(admin);

        }else {
            Admin admin = secondaryAdminRepository.findById(user.getId()).orElseThrow(
                    () -> new RuntimeException("User doesn't exist"));

            admin.setActive(true);
            secondaryAdminRepository.save(admin);
        }
    }

    public ArrayList<Order> getRecentOrder(LocalDateTime start, LocalDateTime end) {

        List<Order> allOrders = primaryOrderRepository.findAll();
        allOrders.addAll(secondaryOrderRepository.findAll());

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
        List<Customer> allCustomers =  primaryCustomerRepo.findAll();
        allCustomers.addAll(secondaryCustomerRepo.findAll());

        ArrayList<Customer> result = new ArrayList<Customer>();
        for(int i=((pgIndex-1)*10);i<min(allCustomers.size(),(pgIndex)*10);i++) {
            if(allCustomers.get(i).getLastLogin().isAfter(LocalDateTime.now().minusMinutes(10)))
                result.add(allCustomers.get(i));
        }
        return result;
    }
}
