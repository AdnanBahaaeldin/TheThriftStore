package com.TheThriftStore.TheThriftStore.Models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.*;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class CustomerInfo {

    private double custBalance;

    private List<OrderHistory> orders;

    private List<CustomerProduct> products;
}
