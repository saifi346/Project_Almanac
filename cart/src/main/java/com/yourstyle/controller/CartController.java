package com.yourstyle.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.yourstyle.Model.Cart;
import com.yourstyle.exceptions.CartNotFoundException;
import com.yourstyle.service.CartService;

@CrossOrigin("*")
@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	CartService service;

	@GetMapping("/usercart/{username}")
	public ResponseEntity<Cart> getUserCart(@PathVariable("username") String username) throws CartNotFoundException {
		Cart cart = service.getCartByUserName(username);
		return new ResponseEntity<>(cart, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/addtocart")
	public ResponseEntity<?> addProductsToCart(@RequestBody Cart cart){
		service.saveCart(cart);
		return ResponseEntity.ok("Product added to cart");
	}
	
	@PutMapping("/updatecart")
	public ResponseEntity<?> updateCart(@RequestBody Cart cart){
		service.updateCart(cart);
		return ResponseEntity.ok("cart updated");
	}
}
