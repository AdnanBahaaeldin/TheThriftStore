package com.TheThriftStore.TheThriftStore.Models;


import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.Data;
import org.springframework.stereotype.Component;

@Enabled
@Data
@Entity
@Component
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long orderId;

    @Column
    private Long customerId;
}
