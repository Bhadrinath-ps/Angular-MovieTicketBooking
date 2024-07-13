import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../Register.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public slogin: RegisterService,
    public router: Router,
    private logger: LoggerService) {}

  ngOnInit(): void {
    this.logger.log("Header Component Initialized");

    this.retrieveLoginState();
  }

  retrieveLoginState(): void {
    const storedData = sessionStorage.getItem('userdata');
    if (storedData) {
      this.slogin.load(JSON.parse(storedData));
    } else {
      this.logout(); // Log out if no login state found in sessionStorage
    }
  }

  logout(): void {
    this.logger.log("Logout requested");

    const storedData = sessionStorage.getItem('userdata');
    if (storedData) {
      if (confirm("Confirm logout")) {
        sessionStorage.removeItem('userdata');
        this.slogin.load(null);
        this.router.navigate(['/']);
      }
    } else {
      sessionStorage.removeItem('userdata');
      this.slogin.load(null);
      // this.router.navigate(['/']);
    }
  }

}
