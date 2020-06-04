import { Router } from '@angular/router';
import { UserServiceService } from './../../../service/user-service.service';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { OrderService } from './../../../service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manageorders',
  templateUrl: './manageorders.component.html',
  styleUrls: ['./manageorders.component.css']
})
export class ManageordersComponent implements OnInit {

  order: any;
  selectedStatus: string = 'New Order';
  selectedOrderStatus: string = 'New Order';
  constructor(public orderService: OrderService, private productService: ProductServiceService, public userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getOrdersByStatus(this.selectedStatus).subscribe(
      res => {
        this.order = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  changeOrderStatus(username, orderId) {
    this.orderService.updateOrderStatus(username, orderId, this.selectedOrderStatus).subscribe(
      res => {
        console.log(res);
        this.getAllOrders();
      },
      err => {
        console.log(err);
      }
    );
  }


  //helpers

  selectStatusHandler(event: any) {
    this.selectedStatus = event.target.value;
    this.getAllOrders();
  }

  selectProductStatusHandler(event: any) {
    this.selectedOrderStatus = event.target.value;
  }

  setProductDetails(name) {
    this.productService.setProdName(name);
  }


}
