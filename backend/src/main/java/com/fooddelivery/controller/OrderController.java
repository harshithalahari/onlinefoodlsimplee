package com.fooddelivery.controller;

import com.fooddelivery.dto.CheckoutRequest;
import com.fooddelivery.dto.OrderDto;
import com.fooddelivery.entity.User;
import com.fooddelivery.service.OrderService;
import com.fooddelivery.util.JwtUtil;
import com.fooddelivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/checkout")
    public ResponseEntity<OrderDto> checkout(@RequestHeader("Authorization") String token, @RequestBody CheckoutRequest request) {
        try {
            String bearerToken = token.substring(7);
            Long userId = jwtUtil.extractUserId(bearerToken);
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            
            OrderDto order = orderService.checkout(user, request);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/user-orders")
    public ResponseEntity<List<OrderDto>> getUserOrders(@RequestHeader("Authorization") String token) {
        try {
            String bearerToken = token.substring(7);
            Long userId = jwtUtil.extractUserId(bearerToken);
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            
            List<OrderDto> orders = orderService.getUserOrders(user);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/all-orders")
    public ResponseEntity<List<OrderDto>> getAllOrders(@RequestHeader("Authorization") String token) {
        try {
            String bearerToken = token.substring(7);
            jwtUtil.validateToken(bearerToken);
            
            List<OrderDto> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
