package com.TheThriftStore.TheThriftStore.Order.Controller;

import com.TheThriftStore.TheThriftStore.Models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.TheThriftStore.TheThriftStore.Order.Service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<String> createOrder() {
        try {
            orderService.createOrder();
            return ResponseEntity.ok("Order created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<String> cancelOrder(@RequestParam Long orderId) {
        try {
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok("Order canceled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<Order>> getOrders(){
        return  ResponseEntity.ok(orderService.getAllOrders());
    }
}