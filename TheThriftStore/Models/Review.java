package com.TheThriftStore.TheThriftStore.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private LocalDateTime reviewDate;

    private Long rate;

    @Column(columnDefinition = "VARCHAR(MAX)")
    private String description;

    // FK to order table  
    @Column
    private Long orderId;
}
