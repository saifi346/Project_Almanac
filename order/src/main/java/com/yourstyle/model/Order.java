package com.yourstyle.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Document(collection="order")
public class Order {
	
	@Id
	private String id;
	
	private String username;
	
	private List<OrderProduct> products;

	public Order(String username, List<OrderProduct> products) {
		this.username = username;
		this.products = products;
	}
	
}
