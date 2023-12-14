import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../Register.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {

  registration: any = "";
  loginEmail: any = "";

  constructor(
    public service: RegisterService,
    public route: ActivatedRoute,
    private http: HttpClient,
    private logger: LoggerService
  ) {
    this.loginEmail = this.service.getemail();
  }

  ngOnInit() {
    this.logger.log("Profile Component Initialized");

    this.service.profiles().subscribe(data => {
      var confirm1 = [];
      var data1 = JSON.parse(JSON.stringify(data));
      for (let key of data1) {
        if (key.email == this.loginEmail) {
          confirm1.push(key);
        }
      }
      this.registration = confirm1;
    });
    //   this.movieList1 = data;


    //   this.route.params.subscribe(paramdata => {
    //     this.searchFor = paramdata['check'];

    //     for (let movie of this.movieList1) {
    //       if (movie.link == this.searchFor) {
    //         this.profile = movie;
    //         break;
    //       }
    //     }
    //   })
    // });

    // this.service.getProfile().subscribe((data) => {
    //   this.profile = data;
    // });
  }
}
