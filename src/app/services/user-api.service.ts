import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthResponse, IFormValues } from '../models/user';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  shopApi: string = 'http://localhost:3377';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  userRegister(registrationData: IFormValues): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.shopApi}/users/register`, registrationData).pipe(
      tap((data: AuthResponse) => {
        console.log('Ответ сервера:', data);
        this.localStorage.saveLocalStorage('token', data.token)
        this.router.navigate(['/']);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Ошибка при регистрации пользователя:', error);
        return throwError(() => error);
      })
    );
  }

  userLogin(loginData: IFormValues): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.shopApi}/users/login`, loginData).pipe(
      tap((data: AuthResponse) => {
        console.log('Ответ сервера:', data);
        this.localStorage.saveLocalStorage('token', data.token)
        this.router.navigate(['/']);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Ошибка при регистрации пользователя:', error);
        return throwError(() => error);
      })
    );
  }
}
