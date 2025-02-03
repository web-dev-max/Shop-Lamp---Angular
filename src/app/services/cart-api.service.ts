import { Injectable } from '@angular/core';
import {ICart} from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  public cart: ICart[];

  constructor() { }
}
