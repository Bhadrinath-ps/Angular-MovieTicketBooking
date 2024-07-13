import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Discount Service

  // private discountStartTime: any;
  // private discountEndTime: any;

  // setDiscountTimes(startTime: Date, endTime: Date) {
  //   this.discountStartTime = startTime;
  //   this.discountEndTime = endTime;
  // }

  // getRemainingTime(): number {
  //   const currentTime = new Date().getTime();
  //   const endTime = this.discountEndTime.getTime();
  //   return endTime - currentTime;
  // }

  // getDiscountEndTime(): Date {
  //   return this.discountEndTime;
  // }
}
