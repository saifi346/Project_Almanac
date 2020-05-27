import { WishlistService } from './../../service/wishlist.service';
import { UserServiceService } from './../../service/user-service.service';
import { CartService } from './../../service/cart.service';
import { Router } from '@angular/router';
import { ProductServiceService } from './../../service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare const displaySearch: any;
declare const displayFilter: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public isCollapsed = true;
  public isCollapsedFilter = true;
  //products: any;
  product: any;
  image: any;
  category: string;
  readonly imageType: string = 'data:image/jpeg;base64,';
  closeResult: string;
  counter: number = 1;
  selectedSize: string;
  selectedColor: string;
  showSucessMessage: boolean;
  message: string;
  msg : string;
  constructor(private userService: UserServiceService, private cartService: CartService, private wishlistService: WishlistService, public productService: ProductServiceService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    //this.getPhoto();

    this.category = this.productService.getProdCategory();
    if (this.category == 'Women') {
      this.getProductByCategory('Women');
    }
    else if (this.category == 'Women') {
      this.getProductByCategory('Men');
    }
    else if (this.category == 'Men') {
      this.getProductByCategory('Men');
    }
    else if (this.category == 'Accessories') {
      this.getProductByCategory('Accessories');
    }
    else if (this.category == 'Bag') {
      this.getProductByCategory('Bag');
    }
    else if (this.category == 'Shoes') {
      this.getProductByCategory('Shoes');
    }
    else if (this.category == 'Watches') {
      this.getProductByCategory('Watches');
    }
    else {
      this.getAllProducts();
    }
    
    document.body.scrollTop = document.documentElement.scrollTop = 0;

  }




  // getPhoto() {
  //   this.productService.retreivePhoto('about-01.jpg').subscribe(
  //     data => {
  //       this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data['content']);
  //       console.log(data);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //     //       data => {
  //     //         let objectURL = 'data:image/jpeg;base64,' + data;
  //     //         this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //     // console.log(this.image);
  //     //       }
  //   );
  // }

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
    this.productService.searchProductsByName(this.productService.selectedProduct.productName).subscribe(
      res => {
        this.productService.products = res;
        this.productService.selectedProduct.productName = '';
      },
      err => {
        console.log(err);
      }
    );
  }

  getProductByCategory(category) {
    this.productService.getProductsByCategory(category).subscribe(
      res => {
        this.productService.products = res;
      },
      err => {
        if (err.status == 500) {
          this.productService.products = null;
        }
        console.log(err);
      }
    );
  }

  selectSizeHandler(event: any) {
    this.selectedSize = event.target.value;
  }

  selectColorHandler(event: any) {
    this.selectedColor = event.target.value;
  }

  //add product to cart
  addProductToCart() {

    this.cartService.cartproduct.userName = this.userService.getUserName();
    this.cartService.selectedCartProduct.prodName = this.product.productName;
    this.cartService.selectedCartProduct.price = this.product.price;
    this.cartService.selectedCartProduct.quantity = this.counter;
    this.cartService.selectedCartProduct.color = this.selectedColor;
    this.cartService.selectedCartProduct.size = this.selectedSize;
    this.cartService.selectedCartProduct.imgurl = this.product.encodedImage;
    this.cartService.cartproduct.products = [this.cartService.selectedCartProduct];

    this.cartService.addtoCart(this.cartService.cartproduct).subscribe(
      res => {
        console.log(res);
        this.message = res['message'];
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
    this.wishlistService.selectedWishlistProduct.price = product.price;
    this.wishlistService.selectedWishlistProduct.encodedUrl = product.encodedImage;
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


  setProductDetails(name) {
    this.productService.setProdName(name);
  }

  onClickShowSearch() {
    displaySearch();
  }

  onClickShowFilter() {
    displayFilter();
  }

  openBackDropCustomClass(content, product) {

    this.product = product;
    this.modalService.open(content, { windowClass: 'my-class' });

  }


  decrement() {
    if (this.counter > 0)
      this.counter -= 1;
  }

  increment() {
    this.counter += 1;
  }

  setCounterOne() {
    this.counter = 1;
  }

}
