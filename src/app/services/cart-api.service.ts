import { Injectable } from '@angular/core';

import {ICart, ICartWithProductInfo} from '../models/cart';
import { LocalStorageService } from './local-storage/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  private cartSubject = new BehaviorSubject<ICartWithProductInfo[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(private localStorage: LocalStorageService) { }

  public AddToCart(obj: ICartWithProductInfo): void {
    const localCart: ICartWithProductInfo[] = this.localStorage.getLocalStorage('cart');
    const updatedCart = [
      ...localCart.filter((item) => item.productId !== obj.productId),
      obj,
    ];
    this.localStorage.saveLocalStorage('cart', updatedCart);
    this.cartSubject.next(updatedCart);
  }
}
