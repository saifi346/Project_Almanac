package com.yourstyle.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.yourstyle.model.Order;
import com.yourstyle.model.OrderProduct;

public interface OrderRepo extends MongoRepository<Order, String>{
	
	Optional<Order> findByUsername(String username);
	
	Boolean existsByUsername(String username);
	
	//List<OrderProduct> findByStatus(String status);
	
}
