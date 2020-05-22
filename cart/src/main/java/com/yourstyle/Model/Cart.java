package com.yourstyle.Model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Document(collection = "cart")
public class Cart {
	
	@Id
	private String id;
	
	private String userName;
	
	private List<CartProduct> products;

	public Cart(String userName, List<CartProduct> products) {
		this.userName = userName;
		this.products = products;
	}
	
	
}
