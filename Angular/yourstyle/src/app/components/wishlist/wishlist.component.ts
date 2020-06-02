import { ProductServiceService } from 'src/app/service/product-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from './../../service/user-service.service';
import { WishlistService } from './../../service/wishlist.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(public wishlistService: WishlistService, private productService: ProductServiceService, public userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    this.wishlistService.getWishlist(this.userService.getUserName()).subscribe(
      res => {
        this.wishlistService.wishlist.id = res['id'];
        this.wishlistService.wishlist.username = res['wishlistService'];
        this.wishlistService.wishlist.wishlistProducts = res['wishlistProducts'];
      },
      err => {
        console.log(err);
      }
    );
  }


  removeProductFromList(product) {
    this.wishlistService.removeProductFromWishlist(this.userService.getUserName(), product).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    window.location.reload();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  onView() {
    this.router.navigateByUrl('/product-details')
  }

  setProductDetails(name) {
    this.productService.setProdName(name);
  }

  login(){
    this.router.navigateByUrl('/login');
  }

}
