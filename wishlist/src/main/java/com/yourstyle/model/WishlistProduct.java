package com.yourstyle.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WishlistProduct {

	private String productName;

	private int price;
	
	private String encodedUrl;

	public WishlistProduct(String productName, int price, String encodedUrl) {
		this.productName = productName;
		this.price = price;
		this.encodedUrl = encodedUrl;
	}

}
