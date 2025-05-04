package com.TheThriftStore.TheThriftStore.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartId;

    // FK to customer table
    @Column(nullable = false)
    private Long customerId;

    private Integer quantity;

    @Column(nullable = false)
    private Long customerProductId;

    // remove the comment when order class is created
//    @OneToOne
//    @JoinColumn(name = "order_id", nullable = false)
//    private Order order;
}
