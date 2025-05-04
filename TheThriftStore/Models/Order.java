package com.TheThriftStore.TheThriftStore.Models;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders") // "order" is a reserved keyword in SQL, so use "orders"
public class Order {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId; 
     
    private Long shippingId; 
    private LocalDateTime orderDate;
    private String status; 
    private Double totalAmount;


    /*@ManyToOne
    @JoinColumn(name = "user_id")
    private Address address;
*/
    @Column
    private Long customerId;

    @Transient
    private List<CartItem> items; // Not stored in DB

	
}

