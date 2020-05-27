import { Product } from './../models/product';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  selectedProduct: Product = {
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
  }

  products: any = null;


  constructor(private http: HttpClient) { }

  //product rest calls
  getAllProducts() {
    return this.http.get("http://localhost:8080/product/allProducts", this.noAuthHeader);
  }

  getProductByName(productName) {
    return this.http.get("http://localhost:8080/product/" + `${productName}`, this.noAuthHeader);
  }

  searchProductsByName(productName) {
    return this.http.get("http://localhost:8080/product/search/" + `${productName}`, this.noAuthHeader);
  }

  getProductsByCategory(categoryName) {
    return this.http.get("http://localhost:8080/product/category/" + `${categoryName}`, this.noAuthHeader);
  }

  publishProduct(product: Product) {
    return this.http.post("http://localhost:8080/product/publishProduct", product);
  }

  updateProduct(product: Product) {
    return this.http.put("http://localhost:8080/updateProduct/" + `${product.productName}`, product)
  }

  updateProductStock(product: Product) {
    return this.http.put("http://localhost:8080/updateProductStock/" + `${product.productName}`, product)
  }

  deleteProductByName(productName) {
    return this.http.delete("http://localhost:8080/product/deleteProduct/" + `${productName}`);
  }

  retreivePhoto(name) {
    return this.http.get("http://localhost:8080/product/photo/" + `${name}`, this.noAuthHeader);
  }

  publishPhoto(name) {
    return this.http.post("http://localhost:8081/products/upload", name);
  }

  setProdName(prodName: string) {
    localStorage.setItem('prodName', prodName);
  }

  getProdName() {
    return localStorage.getItem('prodName');
  }

  setProdCategory(category: string) {
    localStorage.setItem('category', category);
  }

  getProdCategory() {
    return localStorage.getItem('category');
  }

  deleteCategory() {
    localStorage.removeItem('category');
  }

}
