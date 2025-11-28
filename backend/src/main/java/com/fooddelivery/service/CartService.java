package com.fooddelivery.service;

import com.fooddelivery.dto.CartItemDto;
import com.fooddelivery.entity.CartItem;
import com.fooddelivery.entity.FoodItem;
import com.fooddelivery.entity.User;
import com.fooddelivery.repository.CartItemRepository;
import com.fooddelivery.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartItemRepository cartRepository;

    @Autowired
    private FoodItemRepository foodRepository;

    public CartItemDto addToCart(User user, Long foodId, Integer quantity) {
        FoodItem food = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setFood(food);
        cartItem.setQuantity(quantity);

        CartItem saved = cartRepository.save(cartItem);
        return convertToDto(saved);
    }

    public List<CartItemDto> getCart(User user) {
        List<CartItem> items = cartRepository.findByUser(user);
        return items.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public void removeFromCart(Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }

    public CartItemDto updateCartItem(Long cartItemId, Integer quantity) {
        CartItem cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        cartItem.setQuantity(quantity);
        CartItem updated = cartRepository.save(cartItem);
        return convertToDto(updated);
    }

    public void clearCart(User user) {
        cartRepository.deleteByUser(user);
    }

    private CartItemDto convertToDto(CartItem cartItem) {
        return new CartItemDto(cartItem.getId(), cartItem.getFood(), cartItem.getQuantity());
    }
}
