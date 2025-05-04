package com.TheThriftStore.TheThriftStore.Models;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addressId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonBackReference
    private Customer customer;

    @Column(nullable = false)
    private String label;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String zone;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private String apartment;
}
