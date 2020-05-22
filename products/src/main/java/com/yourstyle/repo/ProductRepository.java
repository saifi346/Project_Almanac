package com.yourstyle.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.yourstyle.model.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

	Optional<Product> findByProductName(String productName);

	List<Product> findByCategory(String category);

	Boolean existsByProductName(String productName);

}
