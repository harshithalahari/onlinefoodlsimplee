package com.fooddelivery.dto;

import com.fooddelivery.entity.FoodItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {
    private Long id;
    private FoodItem food;
    private Integer quantity;
}
