package com.TheThriftStore.TheThriftStore.Users.Controllers;

import com.TheThriftStore.TheThriftStore.Models.Customer;
import com.TheThriftStore.TheThriftStore.Models.Order;

import java.time.LocalDateTime;

import com.TheThriftStore.TheThriftStore.Order.Service.OrderService;
import com.TheThriftStore.TheThriftStore.Users.Services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.chrono.ChronoLocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/Admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private OrderService orderService;

    @PreAuthorize("hasAnyRole('ROLE_admin')")
    @GetMapping("/{start}/{end}")
    public ArrayList<Order> getRecentOrder(@PathVariable("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
                                           @PathVariable("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return adminService.getRecentOrder(start, end);
    }

    @PreAuthorize("hasAnyRole('ROLE_admin')")
    @GetMapping("/getAll")
    public ArrayList<Customer> getCurrentLoggedIn() {
        return adminService.getCurrentLoggedIn(1);
    }
    @GetMapping("/get/count")
    public int getCurrentLoggedInCount() {
        ArrayList<Customer> customers = adminService.getCurrentLoggedIn(1);
        return customers.size();
    }

    @GetMapping("/get/orders")
    public List<Order> getAllOrders() {
        try{
            return orderService.getAllOrdersAdmin();
        }catch (Exception e){
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
