import { ProductServiceService } from 'src/app/service/product-service.service';
import { UserServiceService } from './../../service/user-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(public userService: UserServiceService,private prodService : ProductServiceService) { }

  ngOnInit(): void {

  }

  deleteCategory(){
    this.prodService.deleteCategory();
  }
}
