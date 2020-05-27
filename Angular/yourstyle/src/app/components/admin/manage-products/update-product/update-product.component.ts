import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public productService: ProductServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.colorAndSize();
    this.productService.updateProduct(this.productService.selectedProduct).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
       // this.router.navigateByUrl('/manageProducts');
      },
      err => {
        console.log(err);
      }
    )
  }

  resetForm(form: NgForm) {
    this.productService.selectedProduct = {
      id: '',
      title: '',
      productName: '',
      category: '',
      productDescription: '',
      price: null,
      stock: null,
      weight: '',
      dimensions: '',
      materials: '',
      color: null,
      size: null,
      encodedImage: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  colors: Array<string> = [];
  checkColorBoxvalue(event) {
    if (event.target.checked) {
      this.colors.push(event.target.value);
    }
    else {
      const index: number = this.colors.indexOf(event.target.value);
      this.colors.splice(index, 1);
    }
  }

  size: Array<string> = [];
  checkSizeBoxvalue(event) {
    if (event.target.checked) {
      this.size.push(event.target.value);
    }
    else {
      const index: number = this.colors.indexOf(event.target.value);
      this.size.splice(index, 1);
    }
  }

  colorAndSize(){
    this.productService.selectedProduct.color = this.colors;
    this.productService.selectedProduct.size = this.size;
  }
}
