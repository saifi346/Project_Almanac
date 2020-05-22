import { WishlistProduct } from './../models/wishlist-product';
import { HttpClient } from '@angular/common/http';
import { Wishlist } from './../models/wishlist';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  selectedWishlistProduct : WishlistProduct = {
      productName : '',
      price : null,
      encodedUrl : ''
  };

   wishlist : Wishlist = {
     id : '',
     username : '',
     wishlistProducts : null
   };

  constructor(private http : HttpClient) { }

  //rest calls
  getWishlist(username : string) {
    return this.http.get("http://localhost:8080/wishlist/list/" + `${username}`);
  }

  addProductToWishlist(username : string,product : WishlistProduct){
    return this.http.post("http://localhost:8080/wishlist/addtowishlist/" + `${username}`,product);
  }

  removeProductFromWishlist(username : string,product : WishlistProduct){
    return this.http.put("http://localhost:8080/wishlist/removeproduct/" + `${username}`,product);
  }
}
