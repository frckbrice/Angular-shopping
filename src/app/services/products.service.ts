import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Products, Product } from '../type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private apiService: ApiService) { }

  getProducts(url: string, params: PaginationParams): Observable<Products> {
    return this.apiService.get<Products>(url, {
      params,
      responseType: 'json'
    })
  }

  addProduct(url: string, product: Product): Observable<Product> {
    return this.apiService.add<Product>(url, product)
  }

  updateProduct(url: string,  product: Product): Observable<Product> {
    return this.apiService.put<Product>(url, product)
  }

 deleteProduct(url: string): Observable<Product> {
    return this.apiService.delete<Product>(url)
  }
}
