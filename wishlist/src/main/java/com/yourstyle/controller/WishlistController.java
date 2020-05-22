package com.yourstyle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yourstyle.model.Wishlist;
import com.yourstyle.model.WishlistProduct;
import com.yourstyle.service.WishlistService;

@CrossOrigin("*")
@RestController
@RequestMapping("/wishlist")
public class WishlistController {

	@Autowired
	WishlistService service;
	
	@GetMapping("/list/{username}")
	public Wishlist getWishlist(@PathVariable("username") String username) {
		Wishlist wlist = service.getWishlist(username);
		return wlist;
	}
	
	@PostMapping("/addtowishlist/{username}")
	public boolean addProductToWishlist(@PathVariable("username") String username,@RequestBody WishlistProduct product) {
		boolean flag = service.addProductToWishlist(username, product);
		return flag;
	}
	
	@PutMapping("/removeproduct/{username}")
	public String removeProductFromWishlist(@PathVariable("username") String username, @RequestBody WishlistProduct product) {
		service.removeProductFromWishlist(username, product);
		return "product removed from wishlist";
	}
	
}
