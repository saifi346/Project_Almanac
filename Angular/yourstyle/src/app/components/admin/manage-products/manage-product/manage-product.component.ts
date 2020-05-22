import { ProductServiceService } from './../../../../service/product-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  products: any;

  constructor(private productService: ProductServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        this.products = res;
        //this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data['content'])
      },
      err => {

        console.log(err);
      }
    );
  }
  

  onEdit(product: Product) {
    this.productService.selectedProduct = product;
    this.router.navigateByUrl('/updateProduct');
  }

  deleteProduct(product: Product) {
    this.productService.deleteProductByName(product.productName).subscribe(
      res => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  
}
