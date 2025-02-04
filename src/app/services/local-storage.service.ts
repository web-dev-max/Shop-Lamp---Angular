import { Injectable } from '@angular/core';

import {ICart, ICartWithProductInfo} from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getLocalStorage(key: string): ICartWithProductInfo[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  saveLocalStorage(key: string, cart: ICartWithProductInfo[]) {
    return localStorage.setItem(key, JSON.stringify(cart));
  }
}
