package com.fooddelivery.controller;

import com.fooddelivery.entity.FoodItem;
import com.fooddelivery.service.FoodService;
import com.fooddelivery.util.JwtUtil;
import com.fooddelivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<List<FoodItem>> getAllFoods() {
        List<FoodItem> foods = foodService.getAllFoods();
        return ResponseEntity.ok(foods);
    }

    @PostMapping("/add")
    public ResponseEntity<FoodItem> addFood(@RequestHeader("Authorization") String token, @RequestBody FoodItem food) {
        try {
            String bearerToken = token.substring(7);
            jwtUtil.validateToken(bearerToken);
            
            FoodItem savedFood = foodService.addFood(food);
            return ResponseEntity.ok(savedFood);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<FoodItem> updateFood(@RequestHeader("Authorization") String token, @PathVariable Long id, @RequestBody FoodItem food) {
        try {
            String bearerToken = token.substring(7);
            jwtUtil.validateToken(bearerToken);
            
            FoodItem updatedFood = foodService.updateFood(id, food);
            return ResponseEntity.ok(updatedFood);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFood(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        try {
            String bearerToken = token.substring(7);
            jwtUtil.validateToken(bearerToken);
            
            foodService.deleteFood(id);
            return ResponseEntity.ok("Food deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
