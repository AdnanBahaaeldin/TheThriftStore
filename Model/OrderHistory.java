package com.online.TheThriftStore.Model;


import com.online.TheThriftStore.*;
import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.Data;
import org.hibernate.annotations.Comment;
import org.springframework.stereotype.Component;

@Enabled
@Data
@Entity
@Component
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_orderId")
    private Order order;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_Id")
    private Customer customer;
}
