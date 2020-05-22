import { ProductServiceService } from 'src/app/service/product-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private productService : ProductServiceService) { }

  ngOnInit(): void {
  }

  setProdCategory(category: string) {
    this.productService.setProdCategory(category);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if(window.location.href == 'http://localhost:4200/products'){
      window.location.reload();
    }
}

}
