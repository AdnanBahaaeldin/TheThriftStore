package com.online.TheThriftStore.Models;

import com.online.TheThriftStore.Users.Models.Customer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartId;

    // FK to customer table
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id" , nullable = false)
    private Customer customer;

    private Integer quantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_product_id" , nullable = false)
    private CustomerProduct customerProduct;

    // remove the comment when order class is created
//    @OneToOne
//    @JoinColumn(name = "order_id", nullable = false)
//    private Order order;
}
