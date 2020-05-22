import { CartProduct } from './../../models/cart-product';
import { ProductServiceService } from './../../service/product-service.service';
import { NgForm } from '@angular/forms';
import { Cart } from './../../models/cart';
import { UserServiceService } from './../../service/user-service.service';
import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;


  constructor(public cartService: CartService, private userService: UserServiceService, private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getCartproducts();
  }



  getCartproducts() {
    this.cartService.getCart(this.userService.getUserName()).subscribe(
      res => {

        this.cartService.cartproduct.id = res['id'];
        this.cartService.cartproduct.userName = res['userName'];
        this.cartService.cartproduct.products = res['products'];
        this.cartTotal(this.cartService.cartproduct.products);
        this.productQuantity(this.cartService.cartproduct.products);
      },
      err => {
        console.log(err);
      }
    );
  }


  setProductDetails(name) {
    this.productService.setProdName(name);
  }
  sumTotal: number = 0;
  cartTotal(products: CartProduct[]) {
    for (var i = 0; i < products.length; i++) {
      var sum = products[i].price * products[i].quantity;
      this.sumTotal += sum;
    }
  }

  quantity: number[] =new Array();
  productQuantity(products: CartProduct[]) {
    for (var i = 0; i <= products.length; i++) {
      this.quantity[i] = products[i].quantity;
    }
  }

  decrement(i) {
    if (this.quantity[i] > 0)
      this.quantity[i] -= 1;
  }

  increment(i) {
    this.quantity[i] += 1;
  }

  updateCart(){
    for (var i = 0; i < this.quantity.length; i++) {
      this.cartService.cartproduct.products[i].quantity = this.quantity[i];
    }
    this.cartService.updateCart(this.cartService.cartproduct).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
    window.location.reload();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
