package com.online.TheThriftStore2.Model;

import com.online.TheThriftStore2.*;
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
