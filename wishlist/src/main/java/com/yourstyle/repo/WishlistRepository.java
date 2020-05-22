package com.yourstyle.repo;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.yourstyle.model.Wishlist;

public interface WishlistRepository extends MongoRepository<Wishlist, String> {

	Optional<Wishlist> findByUsername(String username);

	Boolean existsByUsername(String username);
}
