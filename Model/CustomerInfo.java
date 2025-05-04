package com.online.TheThriftStore.Model;

import com.online.TheThriftStore.*;
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

    private ArrayList<Order> orders;

    private ArrayList<Product> products;
}
