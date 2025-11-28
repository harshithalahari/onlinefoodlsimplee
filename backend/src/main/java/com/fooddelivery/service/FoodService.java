package com.fooddelivery.service;

import com.fooddelivery.entity.FoodItem;
import com.fooddelivery.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FoodService {
    @Autowired
    private FoodItemRepository foodRepository;

    public List<FoodItem> getAllFoods() {
        return foodRepository.findAll();
    }

    public Optional<FoodItem> getFoodById(Long id) {
        return foodRepository.findById(id);
    }

    public FoodItem addFood(FoodItem food) {
        return foodRepository.save(food);
    }

    public FoodItem updateFood(Long id, FoodItem foodDetails) {
        FoodItem food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));
        
        food.setName(foodDetails.getName());
        food.setDescription(foodDetails.getDescription());
        food.setPrice(foodDetails.getPrice());
        
        return foodRepository.save(food);
    }

    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }
}
