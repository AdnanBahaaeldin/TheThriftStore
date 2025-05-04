package com.online.TheThriftStore2.Controller;


import com.online.TheThriftStore2.*;
import com.online.TheThriftStore2.Model.CustomerInfo;
import com.online.TheThriftStore2.Service.InfoService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/dashboard")
public class InfoController {
    @Autowired
    private InfoService infoService;

    private CustomerInfo customerInfo;

    @RequestMapping("/{customerId}")

    public CustomerInfo info(@PathVariable int customerId) {
        customerInfo=new CustomerInfo();
        updateBalance(customerId);
        updateOrders(customerId);
        updateProdcuts(customerId);
        return customerInfo;
    }

    private void updateOrders(int customerId) {
        customerInfo.setOrders(infoService.getOrders(customerId));
    }

    private void updateProdcuts(int customerId) {
        customerInfo.setProducts(infoService.getProducts(customerId));
    }

    public void updateBalance(int customerId){
        customerInfo.setCustBalance(infoService.getBalance(customerId));
    }

}
