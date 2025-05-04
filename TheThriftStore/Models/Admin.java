package com.TheThriftStore.TheThriftStore.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admin extends Users {

    @Column(nullable = false)
    private boolean isActive;

    @Column(nullable = false)
    private LocalDateTime joinedAt;

}
