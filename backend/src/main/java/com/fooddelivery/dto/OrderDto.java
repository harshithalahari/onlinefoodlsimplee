package com.fooddelivery.dto;

import com.fooddelivery.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private User user;
    private String itemSummary;
    private Double totalAmount;
    private String status;
    private Long createdAt;
}
