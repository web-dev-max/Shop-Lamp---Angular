import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';

import { ProductsApiService } from '../../services/products-api.service';
import { IProducts } from '../../models/products';
import { FormsModule } from '@angular/forms';

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
  public quantity: number = 0;

  constructor(
    private route: ActivatedRoute,
    public productsApiService: ProductsApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      if (this.productId) {
        this.productSubscription = this.productsApiService.getProduct(this.productId).subscribe(product => {
          this.product = product;
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
