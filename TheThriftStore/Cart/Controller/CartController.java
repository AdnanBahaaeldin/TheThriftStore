package com.TheThriftStore.TheThriftStore.Cart.Controller;

import com.TheThriftStore.TheThriftStore.Models.CartItem;
import com.TheThriftStore.TheThriftStore.Cart.Service.CartService;

import com.TheThriftStore.TheThriftStore.Utility.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addItemToCart(@RequestParam Long customerProductId,
                                                @RequestParam Integer quantity) {
        Long customerId = SecurityUtils.getCurrentUserId();
        try {
            cartService.addItemToCart(customerId, customerProductId, quantity);
            return ResponseEntity.ok("Item added to the cart");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeItemFromCart(@RequestParam Long customerProductId) {
        Long customerId = SecurityUtils.getCurrentUserId();

        try{
            cartService.removeItemFromCart(customerId, customerProductId);
            return ResponseEntity.ok("Item removed from the cart");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> removeAllCartItems() {
        Long customerId = SecurityUtils.getCurrentUserId();
        try {
            cartService.removeAllCartItems(customerId);
            return ResponseEntity.ok("All cart items removed from the cart");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/items")
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        Long customerId = SecurityUtils.getCurrentUserId();
        try{
            List<CartItem> cartItems = cartService.getAllCartItems(customerId);
            return ResponseEntity.ok(cartItems);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
