package com.TheThriftStore.TheThriftStore.Dashboard.Service;



import com.TheThriftStore.TheThriftStore.Models.*;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryCustomerProductRepo;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryCustomerRepo;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.PrimaryOrderHistoryRepo;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryCustomerProductRepo;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryCustomerRepo;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.SecondaryOrderHistoryRepo;
import com.TheThriftStore.TheThriftStore.Utility.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InfoService {

    private final PrimaryOrderHistoryRepo primaryOrderHistoryRepo;

    private final SecondaryOrderHistoryRepo secondaryOrderHistoryRepo;

    private final PrimaryCustomerRepo primaryCustomerRepo; // connect to customerRepo

    private final SecondaryCustomerRepo secondaryCustomerRepo;

    private final PrimaryCustomerProductRepo primaryCustomerProductRepo;

    private final SecondaryCustomerProductRepo secondaryCustomerProductRepo;

    public InfoService(PrimaryOrderHistoryRepo primaryOrderHistoryRepo,
                       SecondaryOrderHistoryRepo secondaryOrderHistoryRepo,
                       PrimaryCustomerRepo primaryCustomerRepo,
                       SecondaryCustomerRepo secondaryCustomerRepo,
                       PrimaryCustomerProductRepo primaryCustomerProductRepo,
                       SecondaryCustomerProductRepo secondaryCustomerProductRepo) {
        this.primaryOrderHistoryRepo = primaryOrderHistoryRepo;
        this.secondaryOrderHistoryRepo = secondaryOrderHistoryRepo;
        this.primaryCustomerRepo = primaryCustomerRepo;
        this.secondaryCustomerRepo = secondaryCustomerRepo;
        this.primaryCustomerProductRepo = primaryCustomerProductRepo;
        this.secondaryCustomerProductRepo = secondaryCustomerProductRepo;
    }


    public double getBalance() {
        Long customerId = SecurityUtils.getCurrentUserId();
        if(customerId %2 != 0) {
            try {
                return primaryCustomerRepo.findById(customerId).get().getBalance();
            }catch (Exception e) {
                return -1;
            }
        }else {
            try {
                return secondaryCustomerRepo.findById(customerId).get().getBalance();
            }catch (Exception e) {
                return -1;
            }
        }
    }

    public List<OrderHistory> getOrders() {
        Long customerId = SecurityUtils.getCurrentUserId();
        List<OrderHistory> OH;
        if(customerId %2 != 0) {
            OH = primaryOrderHistoryRepo.findAllByCustomerId(customerId);
        }else {
            OH = secondaryOrderHistoryRepo.findAllByCustomerId(customerId);
        }

        return OH;
    }

    public List<CustomerProduct> getProducts() {
        Long customerId = SecurityUtils.getCurrentUserId();

        List<CustomerProduct> CP = new ArrayList<>();

        CP = primaryCustomerProductRepo.findAllByCustomerId(customerId);

        CP.addAll(secondaryCustomerProductRepo.findAllByCustomerId(customerId));

        return CP;
    }

    public Customer getCustomer(){
        Long customerId = SecurityUtils.getCurrentUserId();
        if(customerId %2 != 0) {
            return primaryCustomerRepo.findById(customerId).get();
        }else {
            return secondaryCustomerRepo.findById(customerId).get();
        }
    }
}
