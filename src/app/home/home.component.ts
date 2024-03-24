import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../type';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import {ButtonModule} from 'primeng/button'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent, 
    CommonModule,
    PaginatorModule, 
    EditPopupComponent, 
    ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products: Product[] = [];
  totalRecords: number = 0;
  rows:number = 5;

  @ViewChild("paginator") paginator: Paginator | undefined;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  selectedProduct: Product = {
    id: 0,
    name: "",
    image: "",
    price: "",
    rating: 0
  }
  
  constructor(private productService: ProductsService){}

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(id: number) {
    this.deleteProduct(id)
  }

  onConfirmEdit(product: Product) {
    console.log("clicked inside edit funct");
    
    if(!this.selectedProduct.id) return;
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }
  
  // // child product reception
  onProductOutPut(product: Product) {
    console.log('Output: ',product)
  }

  // pagination change
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows)
  }

  // get all products
  fetchProducts(page: number, perPage: number) {
    this.productService.getProducts("https://angular-shopping-backend.onrender.com/clothes", { page,perPage}).subscribe({
      next: (data: Products) => {
        console.log(data.items)
        this.products = data.items;
        this.totalRecords = data.total
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  // update one product
  editProduct(product: Product, id: number) {
    this.productService.updateProduct(`https://angular-shopping-backend.onrender.com/clothes/${id}`, product).subscribe({
      next: (data: Product) => {
        console.log(data)
        this.fetchProducts(0, this.rows);
        this.resetPaginator()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  // delete one product
  deleteProduct(id:number) {  
    this.productService.deleteProduct(`https://angular-shopping-backend.onrender.com/clothes/${id}`).subscribe({
      next: (data) => {
        console.log(data)
        this.fetchProducts(0, this.rows);
        this.resetPaginator()
      },
      error : (error) => {
        console.log(error)
      }
    })
  }
  // add one product
  addProduct(product: Product) {
    this.productService.addProduct("https://angular-shopping-backend.onrender.com/clothes", product).subscribe({
      next: (data) => {
        console.log(data)
        this.fetchProducts(0, this.rows);
        this.resetPaginator()
      },
      error : (error) => {
        console.log(error)
      }
    })
  }
  // life cycle hook
  ngOnInit(){
    this.fetchProducts(0, this.rows);
  }

}
