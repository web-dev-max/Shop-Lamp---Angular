import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getLocalStorage<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  saveLocalStorage<T>(key: string, cart: T): void {
    localStorage.setItem(key, JSON.stringify(cart));
  }
}
