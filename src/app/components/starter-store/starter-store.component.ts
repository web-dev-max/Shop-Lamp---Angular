import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ProductsApiService } from '../../services/products-api.service';


@Component({
  selector: 'app-starter-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starter-store.component.html',
  styleUrl: './starter-store.component.scss'
})
export class StarterStoreComponent implements OnInit, OnDestroy {
  private productsSubscription: Subscription | null = null;
  constructor(public productsApiService: ProductsApiService) { }

  ngOnInit() {
    this.productsSubscription = this.productsApiService.getAllProducts().subscribe();
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
