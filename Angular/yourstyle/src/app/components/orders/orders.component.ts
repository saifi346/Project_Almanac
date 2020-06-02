import { ProductServiceService } from 'src/app/service/product-service.service';
import { UserServiceService } from './../../service/user-service.service';
import { Router } from '@angular/router';
import { OrderService } from './../../service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  order : any;

  constructor(public orderService: OrderService,private productService : ProductServiceService, public userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getAllOrdersByUsername(this.userService.getUserName()).subscribe(
      res => {
          this.order = res;
      },
      err => {
        console.log(err);
        
      }
    );
  }

  //helpers
  setProductDetails(name) {
    this.productService.setProdName(name);
  }
}
