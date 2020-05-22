import { CartProduct } from './../models/cart-product';
import { Cart } from './../models/cart';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  selectedCartProduct: CartProduct = {
    prodName: '',
    price: null,
    quantity: null,
    size: '',
    color: '',
    imgurl: ''
  };

   cartproduct: Cart = {
    id: '',
    userName: '',
    products: null
  }

  

  constructor(private http: HttpClient) { }

  //rest calls
  getCart(username){
    return this.http.get("http://localhost:8080/cart/usercart/" + `${username}`);
  }

  addtoCart(product : Cart){
    return this.http.post("http://localhost:8080/cart/addtocart", product);
  }

  updateCart(product : Cart){
    return this.http.put("http://localhost:8080/cart/updatecart", product);
  }

}
