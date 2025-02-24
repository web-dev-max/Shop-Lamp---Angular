import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';

import { ProductsApiService } from '../../services/products-api.service';
import { CartApiService } from '../../services/cart-api.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    InputNumberModule,
    FormsModule,
    ButtonModule,
    InputGroupModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  private productId: string | null = null;
  private productSubscription: Subscription | null = null;
  public quantity: number = 0;

  constructor(
    private route: ActivatedRoute,
    public productsApiService: ProductsApiService,
    private cartApiService: CartApiService,
  ) {}

  private updateQuantity(amount: number) {
    if (amount > 0) {
      this.quantity = Math.min(this.quantity, amount);
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      if (this.productId) {
        this.productSubscription = this.productsApiService.getProduct(this.productId).subscribe();
        this.updateQuantity(this.productsApiService.currentProduct?.amount ?? 0);
      }
    });
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  public AddToCart() {
    const currentProduct = this.productsApiService.currentProduct;
    if (currentProduct) {
      this.cartApiService.AddToCart({
        productId: this.productId || '',
        quantity: this.quantity,
        price: currentProduct.price,
        name: currentProduct.name,
        info: currentProduct.description,
        image: currentProduct.image,
        amount: currentProduct.amount,
      });
    }
  }
}
