package com.online.TheThriftStore.Controller;

import com.online.TheThriftStore.*;

import java.time.LocalDateTime;
import java.util.*;

import com.online.TheThriftStore.Model.Customer;
import com.online.TheThriftStore.Repository.CustomerRepo;
import com.online.TheThriftStore.Repository.OrderRepo;
import com.online.TheThriftStore.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import static java.lang.Math.*;

@RestController
@RequestMapping("")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @RequestMapping("/Admin/{start,end}")
    public ArrayList<Order> getRecentOrder(@PathVariable LocalDateTime start, @PathVariable LocalDateTime end) {
        return adminService.getRecentOrder(start, end);
    }
    @RequestMapping("/Admin/{pgIndex}")
    public ArrayList<Customer> getCurrentLoggedIn(@PathVariable int pgIndex) {
        return adminService.getCurrentLoggedIn(pgIndex);
    }
}
