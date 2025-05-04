package com.online.TheThriftStore.Users.Models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer categoryId;

        @Column(nullable = false)
        private String categoryName;

//        @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
//        @JsonManagedReference
//        private List<Product> products;

}