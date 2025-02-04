import { Injectable } from '@angular/core';
import {
  catchError,
  Observable,
  tap,
  throwError
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProducts } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  constructor(private http: HttpClient) {}

  shopApi: string = 'http://localhost:3001';
  products: IProducts[] = [];
  currentProduct: IProducts | null = null;

  isPending: boolean = false;

  getAllProducts(): Observable<IProducts[]> {
    this.isPending = true;
    return this.http.get<IProducts[]>(`${this.shopApi}/products`, {
    }).pipe(
      tap((data) => {
        this.products =  data;
        this.isPending = false;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Ошибка при загрузке продуктов:', error);
        this.isPending = false;
        return throwError(() => error);
      })
    )
  }

  getProduct(productId: string): Observable<IProducts> {
    return this.http.get<IProducts>(`${this.shopApi}/products/${productId}`, {
    }).pipe(
      tap((data) => {
        this.currentProduct = data;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Ошибка при загрузке продукта:', error);
        return throwError(() => error);
      })
    )
  }
}
