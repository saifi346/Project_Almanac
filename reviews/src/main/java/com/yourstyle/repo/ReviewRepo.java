package com.yourstyle.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.yourstyle.model.Reviews;

public interface ReviewRepo extends MongoRepository<Reviews, String> {

	Optional<Reviews> findByProductName(String productName);
	
	Boolean existsByProductName(String productName);
}
