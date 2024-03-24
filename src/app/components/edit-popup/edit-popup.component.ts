import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../type';
import { FormBuilder, FormsModule, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import {ButtonModule} from 'primeng/button'

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule, 
    CommonModule, 
    FormsModule, 
    RatingModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Output() displayChange =  new EventEmitter<boolean>()
  @Input() header!: string;
  @Output() confirm = new EventEmitter<Product>();

  @Input() product: Product = {
    name: "",
    image: "",
    price: "",
    rating: 0
  }

  productForm = this.formBuilder.group({
    name: ['',[Validators.required, this.specialCharacterValidator()]],
    image: [''],
    price: ['',[Validators.required]],
    rating: [0]
  })

  constructor(private formBuilder: FormBuilder){}

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

// here we patch the form when the component is initialize
  // ngOnInit(){
  //   this.productForm.patchValue(this.product)
  //   // we could have used this instead: 
  //   /* this.productForm.patchValue(
  //     {
  //       name: this.product.name,
  //       image: this.product.image,
  //       price: this.product.price,
  //       rating: this.product.rating
      
  //     }
  //   ) */
  // }

  // here we patch the form when the component is updated by the new product
  ngOnChanges(){
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    const {name, image, price, rating} = this.productForm.value;
    const product = {
      name: name || "", 
      image: image || "", 
      price: price || "", 
      rating: rating || 0
    }
    this.confirm.emit(product);
    this.display =false;
    this.displayChange.emit(this.display);
  }

  onCancel(){
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
