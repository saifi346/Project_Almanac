package com.yourstyle.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yourstyle.model.Order;
import com.yourstyle.model.OrderProduct;
import com.yourstyle.service.OrderService;

@CrossOrigin("*")
@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	OrderService service;

	@GetMapping("/getallorders/{username}")
	public ResponseEntity<Order> getAllOrders(@PathVariable("username") String username) {
		Order orders = service.getAllOrdersByUsername(username);
		return new ResponseEntity<>(orders, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/placeorder")
	public ResponseEntity<?> placeOrder(@RequestBody Order order) {
		service.placeOrder(order);
		return new ResponseEntity<>("{\"message\" : \"Order placed\"}", HttpStatus.OK);
	}

	@PutMapping("/updatestatus/{username}/{orderId}")
	public ResponseEntity<?> updateOrderStatus(@PathVariable("username") String username,
			@PathVariable("orderId") String orderId, @RequestParam("status") String status) {
		service.updateOrderStatus(username, orderId, status);
		return new ResponseEntity<>("{\"message\" : \"status updated\"}", HttpStatus.OK);
	}

	@GetMapping("/getordersbystatus/{status}")
	public ResponseEntity<List<OrderProduct>> getOrders(@PathVariable("status") String status) {
		List<OrderProduct> orders = service.getProductsByStatus(status);
		return new ResponseEntity<>(orders, new HttpHeaders(), HttpStatus.OK);
	}

}
