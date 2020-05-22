package com.yourstyle.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.yourstyle.Model.Cart;

public interface CartRepository extends MongoRepository<Cart, String>{

	Optional<Cart> findByUserName(String userName);
	
	Boolean existsByUserName(String userName);
}
