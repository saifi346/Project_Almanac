package com.yourstyle.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Document(collection = "products")
public class Product {
	
	@Id
	private String id;
	
	private String title;
	
	private String productName;
	
	private String productDescription;
	
	private String category;

	private int price;
	
	String encodedimage;
	

	public Product(String title,String productName,  String category, String productDescription, int price,String encodedimage) {
		super();
		this.title=title;
		this.productName = productName;
		this.productDescription = productDescription;
		this.category = category;
		this.price = price;
		this.encodedimage=encodedimage;
	}

}
