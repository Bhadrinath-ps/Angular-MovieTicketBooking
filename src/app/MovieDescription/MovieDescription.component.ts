import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../Register.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-MovieDescription',
  templateUrl: './MovieDescription.component.html',
  styleUrls: ['./MovieDescription.component.css']
})
export class MovieDescriptionComponent implements OnInit {

  movieList1: any = "";
  searchFor: any = "";
  finalMovie: any = "";

  constructor(
    private service: RegisterService,
    private route: ActivatedRoute,
    private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log("MovieDescription Component Initialized");

    this.service.movieNowShowing().subscribe(data => {
      this.movieList1 = data;

      this.route.params.subscribe(paramdata => {
        this.searchFor = paramdata['check'];

        for (let movie of this.movieList1) {
          if (movie.link == this.searchFor) {
            this.finalMovie = movie;
            this.logger.log("Now Showing Movies found");
            break;
          }
        }
      })
    });

    this.service.movieUpcoming().subscribe(data => {
      this.movieList1 = data;

      this.route.params.subscribe(paramdata => {
        this.searchFor = paramdata['check'];

        for (let movie of this.movieList1) {
          if (movie.link == this.searchFor) {
            this.finalMovie = movie;
            this.logger.log("Upcoming Movies found");
            break;
          }
        }
      })
    });
  }

}
