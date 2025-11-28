package com.fooddelivery.controller;

import com.fooddelivery.dto.CartItemDto;
import com.fooddelivery.entity.User;
import com.fooddelivery.service.CartService;
import com.fooddelivery.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fooddelivery.repository.UserRepository;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<CartItemDto> addToCart(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> request) {
        try {
            String bearerToken = token.substring(7);
            Long userId = jwtUtil.extractUserId(bearerToken);
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            
            Long foodId = ((Number) request.get("foodId")).longValue();
            Integer quantity = ((Number) request.get("quantity")).intValue();

            CartItemDto cartItem = cartService.addToCart(user, foodId, quantity);
            return ResponseEntity.ok(cartItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/view")
    public ResponseEntity<List<CartItemDto>> getCart(@RequestHeader("Authorization") String token) {
        try {
            String bearerToken = token.substring(7);
            Long userId = jwtUtil.extractUserId(bearerToken);
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            
            List<CartItemDto> items = cartService.getCart(user);
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/remove/{cartId}")
    public ResponseEntity<String> removeFromCart(@RequestHeader("Authorization") String token, @PathVariable Long cartId) {
        try {
            cartService.removeFromCart(cartId);
            return ResponseEntity.ok("Item removed");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PutMapping("/update/{cartId}")
    public ResponseEntity<CartItemDto> updateCartItem(@RequestHeader("Authorization") String token, @PathVariable Long cartId, @RequestBody Map<String, Object> request) {
        try {
            Integer quantity = ((Number) request.get("quantity")).intValue();
            CartItemDto cartItem = cartService.updateCartItem(cartId, quantity);
            return ResponseEntity.ok(cartItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
