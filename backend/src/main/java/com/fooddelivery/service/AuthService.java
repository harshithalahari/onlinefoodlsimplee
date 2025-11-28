package com.fooddelivery.service;

import com.fooddelivery.dto.AuthResponse;
import com.fooddelivery.dto.LoginRequest;
import com.fooddelivery.dto.SignupRequest;
import com.fooddelivery.dto.UserDto;
import com.fooddelivery.entity.User;
import com.fooddelivery.repository.UserRepository;
import com.fooddelivery.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse login(LoginRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        
        if (user.isEmpty() || !user.get().getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        User foundUser = user.get();
        String token = jwtUtil.generateToken(foundUser.getEmail(), foundUser.getId(), foundUser.getRole());
        
        UserDto userDto = new UserDto(foundUser.getId(), foundUser.getName(), foundUser.getEmail(), foundUser.getRole());
        return new AuthResponse(userDto, token);
    }

    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword()); // In production, hash the password!
        newUser.setRole(request.getRole());

        User savedUser = userRepository.save(newUser);
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getId(), savedUser.getRole());
        
        UserDto userDto = new UserDto(savedUser.getId(), savedUser.getName(), savedUser.getEmail(), savedUser.getRole());
        return new AuthResponse(userDto, token);
    }
}
