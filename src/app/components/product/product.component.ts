import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

import { ProductsApiService } from '../../services/products-api.service';
import { IProducts } from '../../models/products';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, InputNumberModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  private productId: string | null = null;
  private productSubscription: Subscription | null = null;
  public product: IProducts | null = null;
  public quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    public productsApiService: ProductsApiService
  ) {}

  private updateQuantity(amount: number | null): void {
    const safeAmount = amount ?? 0;
    if (safeAmount > 0) {
      this.quantity = Math.min(this.quantity, safeAmount);
    } else {
      this.quantity = 0;
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      if (this.productId) {
        this.productSubscription = this.productsApiService.getProduct(this.productId).subscribe(product => {
          this.product = product;
          this.updateQuantity(product.amount);
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
