package com.yourstyle.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yourstyle.model.Order;
import com.yourstyle.model.OrderProduct;
import com.yourstyle.repo.OrderRepo;

@Service
public class OrderService {

	@Autowired
	OrderRepo repo;

	public Order getAllOrdersByUsername(String username) {
		Optional<Order> userOrder = repo.findByUsername(username);
		if (userOrder.isPresent()) {
			return userOrder.get();
		} else {
			System.out.println("No orders present for the user");
			return userOrder.get();
		}
	}

	public void placeOrder(Order order) {
		if (repo.existsByUsername(order.getUsername())) {
			Optional<Order> userOrder = repo.findByUsername(order.getUsername());
			if (userOrder.isPresent()) {
				List<OrderProduct> products = userOrder.get().getProducts();
				products.addAll(order.getProducts());
				userOrder.get().setProducts(products);
				repo.save(userOrder.get());
			}
		} else {
			repo.save(order);
		}
	}

	public void updateOrderStatus(String username, String orderId, String status) {
		int i = 0;
		if (repo.existsByUsername(username)) {
			Optional<Order> userOrder = repo.findByUsername(username);
			if (userOrder.isPresent()) {
				List<OrderProduct> orderProducts = userOrder.get().getProducts();
				List<OrderProduct> products = orderProducts;
				for (OrderProduct product : products) {

					if (product.getOrderId().equals(orderId)) {
						product.setStatus(status);
						orderProducts.set(i, product);
						break;
					}
					i++;
				}
				userOrder.get().setProducts(orderProducts);
				repo.save(userOrder.get());

			}
		}
		
		else {
			System.out.println("no product found with orderId : "+orderId);
		}
	}
	
	public List<OrderProduct> getProductsByStatus(String status) {
		List<OrderProduct> finalProductList = new ArrayList<>();
		List<Order> orders= repo.findAll();
		for(Order order : orders) {
			List<OrderProduct> products = order.getProducts();
			for(OrderProduct product : products) {
				if(product.getStatus().equals(status)) {
					finalProductList.add(product);
				}
			}
		}
		
		return finalProductList;
	}

}
