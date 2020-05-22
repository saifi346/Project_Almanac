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
      id : '',
      title: '',
      productName: '',
      category: '',
      productDescription: '',
      price: null,
      encodedImage: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
