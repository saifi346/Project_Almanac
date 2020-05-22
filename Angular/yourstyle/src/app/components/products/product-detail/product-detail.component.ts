import { WishlistService } from './../../../service/wishlist.service';
import { UserServiceService } from './../../../service/user-service.service';
import { CartService } from './../../../service/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbNavConfig, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';

import * as $ from 'jquery'
import { ProductServiceService } from 'src/app/service/product-service.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [NgbNavConfig]
})
export class ProductDetailComponent implements OnInit {

  showSucessMessage: boolean;
  message : string;
  serverErrorMessages: string;
  product: any;
  cart: any;
  msg : string;
  selectedSize : string;
  selectedColor : string;
  counter: number =1;
  

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private wishlistService: WishlistService,private userService : UserServiceService, public productService: ProductServiceService, private cartService: CartService, config: NgbNavConfig, ratingConfig: NgbRatingConfig, private router: Router) {
    ratingConfig.max = 5;
    config.destroyOnHide = false;
    config.roles = false;
  }

  ngOnInit(): void {


    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.getAllProducts();
    this.getProductByName();

  }

  ngAfterViewInit(): void {

    /*==================================================================
    [ +/- num product ]*/
    // $('.btn-num-product-down').on('click', function () {
    //   var numProduct = Number($(this).next().val());
    //   if (numProduct > 0) $(this).next().val(numProduct - 1);
    // });

    // $('.btn-num-product-up').on('click', function () {
    //   var numProduct = Number($(this).prev().val());
    //   $(this).prev().val(numProduct + 1);
    // });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        this.productService.products = res;
        //this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data['content'])
      },
      err => {

        console.log(err);
      }
    );
  }

  getProductByName() {
    this.productService.getProductByName(this.productService.getProdName()).subscribe(
      res => {
        this.product = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  setProdName(prodName) {
    this.productService.setProdName(prodName);
    this.ngOnInit();
  }

  decrement() {
    if (this.counter > 0)
      this.counter -= 1;
  }

  increment() {
    this.counter += 1;
  }

  setCounterOne(){
    this.counter=1;
  }

  selectSizeHandler(event : any){
    this.selectedSize = event.target.value;
  }

  selectColorHandler(event : any){
    this.selectedColor = event.target.value;
  }

  //add product to cart
  addProductToCart() {

    this.cartService.cartproduct.userName = this.userService.getUserName();
    this.cartService.selectedCartProduct.prodName = this.product.productName;
    this.cartService.selectedCartProduct.price = this.product.price;
    this.cartService.selectedCartProduct.quantity= this.counter;
    this.cartService.selectedCartProduct.color= this.selectedColor;
    this.cartService.selectedCartProduct.size= this.selectedSize;
    this.cartService.selectedCartProduct.imgurl = this.product.encodedImage;
    this.cartService.cartproduct.products = [this.cartService.selectedCartProduct];

    this.cartService.addtoCart(this.cartService.cartproduct).subscribe(
      res => {
        console.log(res);
        this.message=res['message'];
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
      },
      err => {
        console.log(err);
      }
    )
  }

  //add product to wishlist
  addProductToWishlist(product) {
    this.wishlistService.selectedWishlistProduct.productName = product.productName;
    this.wishlistService.selectedWishlistProduct.price = product.price;;
    this.wishlistService.selectedWishlistProduct.encodedUrl = product.encodedImage;;
    this.wishlistService.addProductToWishlist(this.userService.getUserName(), this.wishlistService.selectedWishlistProduct).subscribe(
      res => {
        this.wishlistService.selectedWishlistProduct.productName = '';
        this.wishlistService.selectedWishlistProduct.price = null;
        this.wishlistService.selectedWishlistProduct.encodedUrl = '';
        this.msg = res['message'];
      },
      err => {
        console.log(err);
      }
    );
  }

  removeProductFromList(product) {
    this.wishlistService.selectedWishlistProduct.productName = product.productName;
    this.wishlistService.selectedWishlistProduct.price = product.price;;
    this.wishlistService.selectedWishlistProduct.encodedUrl = product.encodedImage;;
    this.wishlistService.removeProductFromWishlist(this.userService.getUserName(), this.wishlistService.selectedWishlistProduct).subscribe(
      res => {
        console.log(res);
        this.wishlistService.selectedWishlistProduct.productName = '';
        this.wishlistService.selectedWishlistProduct.price = null;
        this.wishlistService.selectedWishlistProduct.encodedUrl = '';
      },
      err => {
        console.log(err);
      }
    );
    
  }
  
}
