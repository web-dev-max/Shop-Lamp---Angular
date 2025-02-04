import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CartApiService} from '../../services/cart-api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public cartApiService: CartApiService) {}
}
