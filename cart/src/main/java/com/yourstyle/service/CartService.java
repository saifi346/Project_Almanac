package com.yourstyle.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yourstyle.Model.Cart;
import com.yourstyle.Model.CartProduct;
import com.yourstyle.exceptions.CartNotFoundException;
import com.yourstyle.repo.CartRepository;

@Service
public class CartService {

	@Autowired
	CartRepository repo;
	
	public Cart getCartByUserName(String username) throws CartNotFoundException{
		Optional<Cart> cart = repo.findByUserName(username);
		if(cart.isPresent()) {
			return cart.get();
		}
		else {
			throw new CartNotFoundException("No cart Found for the user : " + username);
		}
	}
	
	public String saveCart(Cart cart) {
		if(repo.existsByUserName(cart.getUserName())) {
			Optional<Cart> usercart = repo.findByUserName(cart.getUserName());
			if(usercart.isPresent()) {
				List<CartProduct> products = usercart.get().getProducts();
				products.addAll(cart.getProducts());
				usercart.get().setProducts(products);
				repo.save(usercart.get());
			}
			
			
		}
		else {
			repo.save(cart);
		}
		
		return "cart Saved Successfully";
	}
	
	public String updateCart(Cart cart) {
		Optional<Cart> usercart = repo.findByUserName(cart.getUserName());
		if(usercart.isPresent()) {
			List<CartProduct> products = cart.getProducts();
			List<CartProduct> temp = new ArrayList<>();
			for(CartProduct product : products) {
				if(product.getQuantity()<1) {
					temp.add(product);
				}
			}
			products.removeAll(temp);
			usercart.get().setProducts(products);
			repo.save(usercart.get());
		}
		return "cart updated successfully";
	}
}
