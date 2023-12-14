import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

constructor() { }

 // Store all the data in a single resource

 totaldata = {}
 storedata(data:any) {
   Object.assign(this.totaldata, data);
 }

 getData() {
   return this.totaldata;
 }
 
}
