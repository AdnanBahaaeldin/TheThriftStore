package com.TheThriftStore.TheThriftStore.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends Users {
    
    @Column(nullable = false)
    private LocalDateTime lastLogin;

//    @Column(nullable = false)
    private Double balance = 0.0;

    @Lob
    private byte[] imageData;

}
