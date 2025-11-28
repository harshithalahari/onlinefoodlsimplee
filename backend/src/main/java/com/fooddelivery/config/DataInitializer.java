package com.fooddelivery.config;

import com.fooddelivery.entity.FoodItem;
import com.fooddelivery.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private FoodItemRepository foodRepository;

    @Override
    public void run(String... args) throws Exception {
        if (foodRepository.count() == 0) {
            FoodItem pizza = new FoodItem();
            pizza.setName("Margherita Pizza");
            pizza.setDescription("Cheese pizza with basil");
            pizza.setPrice(250.0);

            FoodItem burger = new FoodItem();
            burger.setName("Classic Burger");
            burger.setDescription("Juicy beef burger with veggies");
            burger.setPrice(150.0);

            FoodItem biryani = new FoodItem();
            biryani.setName("Chicken Biryani");
            biryani.setDescription("Fragrant basmati rice with chicken");
            biryani.setPrice(300.0);

            FoodItem pasta = new FoodItem();
            pasta.setName("Carbonara Pasta");
            pasta.setDescription("Creamy pasta with bacon");
            pasta.setPrice(200.0);

            FoodItem samosa = new FoodItem();
            samosa.setName("Samosa");
            samosa.setDescription("Crispy fried pastry with potato filling");
            samosa.setPrice(50.0);

            FoodItem noodles = new FoodItem();
            noodles.setName("Chow Mein");
            noodles.setDescription("Chinese stir-fried noodles");
            noodles.setPrice(120.0);

            foodRepository.save(pizza);
            foodRepository.save(burger);
            foodRepository.save(biryani);
            foodRepository.save(pasta);
            foodRepository.save(samosa);
            foodRepository.save(noodles);
        }
    }
}
