package com.TheThriftStore.TheThriftStore.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    private Long productId;

    @Column(nullable = false)
    private String categoryName;

    @Column(nullable = false)
    private String productName;

    // I want to store long text not a normal string
    // If we don't mention this it will be a normal string with varchar(255)
    @Column(columnDefinition = "VARCHAR(MAX)")
    private String description;

    @Column(nullable = false)
    private Integer quantity;

    private String imageURL;

    @Column(nullable = false)
    private Double price;

}
