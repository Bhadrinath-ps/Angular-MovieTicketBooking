import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './Register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieBooking';

  public data: any;
  constructor(public slogin: RegisterService, public router: Router) {

    var values = JSON.parse(localStorage.getItem('userdata') + "");
    slogin.load(values);

  }

  ngOnInit(): void {  }


}
