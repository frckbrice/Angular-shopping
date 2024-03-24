import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../type';
import { RatingModule } from 'primeng/rating';
import { FormsModule, NgModel } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import {ButtonModule} from 'primeng/button'
import { ConfirmationService,MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { PricePipe } from '../../pipe/price.pipe';
import { TruncateNamePipe } from '../../pipe/truncate-name.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule, 
    FormsModule, 
    CurrencyPipe, 
    ButtonModule, 
    ConfirmPopupModule, 
    ToastModule,
    PricePipe,
    TruncateNamePipe
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product ;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>()

  // this will locate the deleteButton element in the template  
  @ViewChild("deleteButton") deleteButton: any

  constructor(private confirmationService: ConfirmationService, public messageService: MessageService){}

  editProduct(){
    this.edit.emit(this.product);
  }

  confirmDelete(){
    this.confirmationService.confirm({
      // set the target of this as the deleteButton
      target: this.deleteButton.nativeElement,
      message: 'Are you sure you want to delete this product ?',
      accept: () => {
        this.deleteProduct();
        this.messageService.add({
          severity: "success",
          summary: "Service Message",
          detail: "Via MessageService"
        });
      }
    })
  }

  deleteProduct(){
    if(!this.product) return;
    this.delete.emit(this.product.id);
  }

}
