import { CartService } from './../../service/cart.service';
import { Router } from '@angular/router';
import { Address } from './../../models/address';
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

  constructor(public userservice: UserServiceService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getUserDetails();
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

  onSubmit(form: NgForm) {
    this.updateCart();
    this.router.navigateByUrl('/orderDetail');
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
