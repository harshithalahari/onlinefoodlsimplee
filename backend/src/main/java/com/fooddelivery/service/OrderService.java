package com.fooddelivery.service;

import com.fooddelivery.dto.CheckoutRequest;
import com.fooddelivery.dto.OrderDto;
import com.fooddelivery.entity.Order;
import com.fooddelivery.entity.User;
import com.fooddelivery.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    public OrderDto checkout(User user, CheckoutRequest request) {
        Order order = new Order();
        order.setUser(user);
        order.setItemSummary(request.getCartItems());
        order.setTotalAmount(request.getTotalAmount());

        Order saved = orderRepository.save(order);
        cartService.clearCart(user);

        return convertToDto(saved);
    }

    public List<OrderDto> getUserOrders(User user) {
        List<Order> orders = orderRepository.findByUser(user);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc();
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private OrderDto convertToDto(Order order) {
        return new OrderDto(order.getId(), order.getUser(), order.getItemSummary(), 
                           order.getTotalAmount(), order.getStatus(), order.getCreatedAt());
    }
}
