import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatBookingService {

  constructor() { }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
