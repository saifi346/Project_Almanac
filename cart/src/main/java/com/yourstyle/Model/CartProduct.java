package com.yourstyle.Model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartProduct {

	private String prodName;
	private int price;
	private int quantity;
	private String size;
	private String color;
	private String imgurl;

	public CartProduct(String prodName, int price, int quantity, String size, String color, String imgurl) {
		this.prodName = prodName;
		this.price = price;
		this.quantity = quantity;
		this.size = size;
		this.color = color;
		this.imgurl = imgurl;
	}
}
