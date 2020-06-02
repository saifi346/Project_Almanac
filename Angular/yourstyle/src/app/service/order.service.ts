import { OrderProduct } from './../models/order-product';
import { Order } from './../models/order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderProduct: OrderProduct = {
    orderId: '',
    productName: '',
    price: null,
    quantity: null,
    size: '',
    color: '',
    deliveryAddress: '',
    status: '',
    imgurl : '',
    username : ''
  }

  order : Order = {
    id : '',
    username : '',
    products : []
  }

  constructor(private http: HttpClient) { }

  //rest calls
  getAllOrdersByUsername(username : string){
    return this.http.get("http://localhost:8080/order/getallorders/" + `${username}`);
  }

  getOrdersByStatus(status : string){
    return this.http.get("http://localhost:8080/order/getordersbystatus/" + `${status}`);
  }

  placeOrder(order : any){
   return this.http.post("http://localhost:8080/order/placeorder",order);
  }

  updateOrderStatus(username : string,orderId : string,status : string){
    return this.http.put("http://localhost:8080/order/updatestatus/" + `${username}` + "/" + `${orderId}` + "?status=" + `${status}`,1);
  }
}
