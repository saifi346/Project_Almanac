package com.yourstyle.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Document(collection="wishlist")
public class Wishlist {
	
	@Id
	private String id;
	
	private String username;
	
	private List<WishlistProduct> wishlistProducts;
	
	public Wishlist() {}

	public Wishlist(String username, List<WishlistProduct> wishlistProducts) {
		this.username = username;
		this.wishlistProducts = wishlistProducts;
	}

}
