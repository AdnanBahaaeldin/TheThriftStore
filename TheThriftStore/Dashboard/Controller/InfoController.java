package com.TheThriftStore.TheThriftStore.Dashboard.Controller;

import com.TheThriftStore.TheThriftStore.Models.CustomerInfo;
import com.TheThriftStore.TheThriftStore.Dashboard.Service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class InfoController {
    @Autowired
    private InfoService infoService;

    private CustomerInfo customerInfo;

    @GetMapping("/")
    public CustomerInfo info() {
        customerInfo=new CustomerInfo();
        getCustomer();
        updateBalance();
        updateOrders();
        updateProducts();
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

    public void getCustomer(){customerInfo.setCustomer(infoService.getCustomer());}
}
