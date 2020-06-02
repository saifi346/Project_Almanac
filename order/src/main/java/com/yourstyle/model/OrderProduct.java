package com.yourstyle.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderProduct {

	private String orderId;
	
	private String productName;
	
	private int price;
	
	private int quantity;
	
	private String size;
	
	private String color;
	
	private String deliveryAddress;
	
	private String status;
	
	private String imgurl;
	
	private String username;

	public OrderProduct(String orderId, String productName, int price, int quantity, String size, String color, String deliveryAddress,
			String status,String imgurl,String username) {
		this.orderId=orderId;
		this.productName = productName;
		this.price = price;
		this.quantity = quantity;
		this.size = size;
		this.color = color;
		this.deliveryAddress = deliveryAddress;
		this.status = status;
		this.imgurl =imgurl;
		this.username =username;
	}

}
