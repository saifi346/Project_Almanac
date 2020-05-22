package com.yourstyle.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yourstyle.model.Wishlist;
import com.yourstyle.model.WishlistProduct;
import com.yourstyle.repo.WishlistRepository;

@Service
public class WishlistService {

	@Autowired
	WishlistRepository repo;

	public Wishlist getWishlist(String username) {
		Optional<Wishlist> wishlist = repo.findByUsername(username);
		if (wishlist.isPresent()) {
			return wishlist.get();
		} else {
			return new Wishlist();
		}

	}

	public boolean addProductToWishlist(String username, WishlistProduct product) {
		boolean flag=false;
		if (repo.existsByUsername(username)) {
			Optional<Wishlist> list = repo.findByUsername(username);
			if (list.isPresent()) {
				List<WishlistProduct> products = list.get().getWishlistProducts();
				for(WishlistProduct wlistproduct : products) {
					if(wlistproduct.getProductName().equals(product.getProductName())) {
						flag = true;
						return flag;
					}
				}
				products.add(product);
				list.get().setWishlistProducts(products);
				repo.save(list.get());
			}
		} else {
			List<WishlistProduct> wlistProduct = new ArrayList<>();
			wlistProduct.add(product);
			Wishlist wlist = new Wishlist(username, wlistProduct);
			repo.save(wlist);
		}
		
		return flag;
	}

	public void removeProductFromWishlist(String username, WishlistProduct product) {
		if (repo.existsByUsername(username)) {
			Optional<Wishlist> wishlist = repo.findByUsername(username);
			if (wishlist.isPresent()) {
				List<WishlistProduct> products = wishlist.get().getWishlistProducts();
				List<WishlistProduct> temp = new ArrayList<>();
				for(WishlistProduct wlistproduct : products) {
					if(!wlistproduct.getProductName().equals(product.getProductName())) {
						temp.add(wlistproduct);
					}
				}
				wishlist.get().setWishlistProducts(temp);
				repo.save(wishlist.get());
			}
		}
	}

}
