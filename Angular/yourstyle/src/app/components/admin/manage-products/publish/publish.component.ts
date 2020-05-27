import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from './../../../../service/product-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  selectedFile: File = null;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public productService: ProductServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const fd = new FormData();
    this.colorAndSize();
    fd.append('file', this.selectedFile)
    this.productService.publishPhoto(fd).subscribe(
      res => {
      },
      err => {
        console.log(err);
      }
    );
    this.productService.publishProduct(this.productService.selectedProduct).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    );
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.productService.selectedProduct.title = event.target.files[0].name;
    console.log(event)
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




