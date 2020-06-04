import { OrderService } from './../../service/order.service';
import { CartService } from './../../service/cart.service';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { NgForm } from '@angular/forms';
import { UserServiceService } from './../../service/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css']
})
export class DeliveryDetailsComponent implements OnInit {

  address: any;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public orderService: OrderService, public userservice: UserServiceService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getCartproducts();
  }



  getUserDetails() {
    this.userservice.getUserProfile(this.userservice.getUserName()).subscribe(
      res => {
        this.userservice.selectedUser.name = res['name'];
        this.userservice.selectedUser.email = res['email'];
        this.userservice.selectedUser.phone = res['phone'];
        this.address = res['address'];
        this.userservice.selectedUser.address.addressLine = this.address.addressLine;
        this.userservice.selectedUser.address.city = this.address.city;
        this.userservice.selectedUser.address.state = this.address.state;
        this.userservice.selectedUser.address.zipcode = this.address.zipcode;
      },
      err => {
        console.log(err);

      }
    );
  }
  flag: boolean = false;
  onSubmit(form: NgForm) {
    this.placeOrder();
    this.updateCart();
    this.router.navigateByUrl('/orderDetail');

  }

  getCartproducts() {
    this.cartService.getCart(this.userservice.getUserName()).subscribe(
      res => {

        this.cartService.cartproduct.id = res['id'];
        this.cartService.cartproduct.userName = res['userName'];
        this.cartService.cartproduct.products = res['products'];
      },
      err => {
        console.log(err);
      }
    );
  }

  placeOrder() {
    this.orderService.order.username = this.userservice.getUserName();
    for (var i = 0; i < this.cartService.cartproduct.products.length; i++) {


      this.orderService.order.products.push({
        orderId: uuid.v4(),
        productName: this.cartService.cartproduct.products[i].prodName,
        size: this.cartService.cartproduct.products[i].size,
        color: this.cartService.cartproduct.products[i].color,
        price: this.cartService.cartproduct.products[i].price,
        quantity: this.cartService.cartproduct.products[i].quantity,
        deliveryAddress: this.collateAddress(),
        status: 'New Order',
        imgurl: this.cartService.cartproduct.products[i].imgurl,
        username: this.orderService.order.username
      });

    }

    this.orderService.placeOrder(this.orderService.order).subscribe(
      res => {
        console.log(res['message']);
        this.orderService.order.products = [];
        this.flag = true;
      },
      err => {
        console.log(err);
      }

    );
  }

  collateAddress(): string {
    return this.userservice.selectedUser.name + '\n' +
      this.userservice.selectedUser.phone + '\n' +
      this.userservice.selectedUser.address.addressLine + ', ' +
      this.userservice.selectedUser.address.city + ', ' +
      this.userservice.selectedUser.address.state + ', ' +
      this.userservice.selectedUser.address.zipcode;

  }

  updateCart() {
    for (var i = 0; i < this.cartService.cartproduct.products.length; i++) {
      this.cartService.cartproduct.products[i].quantity = 0;
    }
    this.cartService.updateCart(this.cartService.cartproduct).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

  }

}
