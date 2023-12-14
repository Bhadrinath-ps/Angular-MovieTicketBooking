import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { moviedata } from '../movieModel';
import { RegisterService } from '../Register.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-UpdateMoviesUpcoming',
  templateUrl: './UpdateMoviesUpcoming.component.html',
  styleUrls: ['./UpdateMoviesUpcoming.component.css']
})
export class UpdateMoviesUpcomingComponent implements OnInit {

  dataId: any;
  public movie: moviedata = {} as moviedata;

  constructor(
    private service: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log("UpdateMoviesUpcoming Component Initialized");

    this.route.paramMap.subscribe((param: Params) => {
      this.dataId = param['get']('id')
    })

    this.service.getMovieUpcomingById(this.dataId).subscribe((data: any) => {
      this.movie = data;
      this.logger.log(`Fetched movie data for update: ${JSON.stringify(this.movie)}`);
    })
  }

  updateUC() {
    this.service.updateMovieUpcoming(this.movie, this.dataId).subscribe((data: any) => {
      this.logger.log(`Updated movie data: ${JSON.stringify(this.movie)}`);
      this.router.navigateByUrl('/Admin');
    })
  }
}
