package com.TheThriftStore.TheThriftStore.Models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerProduct {
    public enum Status {
        AVAILABLE, SOLD
    }

    @Id
    private Long customerProductId;

    @Column(nullable = false)
    private Long customerId;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Status status = Status.AVAILABLE; // sold, available, etc.

}
