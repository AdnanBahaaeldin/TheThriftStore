package com.TheThriftStore.TheThriftStore.Dashboard.Controller;

import com.TheThriftStore.TheThriftStore.Models.Customer;
import com.TheThriftStore.TheThriftStore.Models.CustomerInfo;
import com.TheThriftStore.TheThriftStore.Dashboard.Service.InfoService;
import com.TheThriftStore.TheThriftStore.Models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
public class InfoController {
    @Autowired
    private InfoService infoService;

    private CustomerInfo customerInfo;

    @GetMapping("/")
    public CustomerInfo info() {
        customerInfo=new CustomerInfo();
        updateBalance();
        updateOrders();
        updateProducts();
        getCustomerData();
        return customerInfo;
    }

    private void updateOrders( ) {
        customerInfo.setOrders(infoService.getOrders());
    }

    private void updateProducts( ) {
        customerInfo.setProducts(infoService.getProducts());
    }

    public void updateBalance( ){
        customerInfo.setCustBalance(infoService.getBalance());
    }

    public void getCustomerData( ){
        Customer customer = infoService.getCustomerData();
        customerInfo.setName(customer.getName());
        customerInfo.setEmail(customer.getEmail());
        customerInfo.setPhoneNumber(customer.getPhoneNumber());
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCustomerDetails(@RequestBody Customer customer){
        try {
            infoService.updateCustomerDetails(customer);
            return ResponseEntity.ok("Customer updated successfully");
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/balance")
    public ResponseEntity<String> updateCustomerBalance(@RequestBody int newBalance){
        try {
//            Long nbalance = Long.getLong(newBalance);
            infoService.updateCustomerBalance((long)newBalance);
            return ResponseEntity.ok("Customer updated successfully");
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
