import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { moviedata } from '../movieModel';
import { RegisterService } from '../Register.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-UpdateMoviesNowShowing',
  templateUrl: './UpdateMoviesNowShowing.component.html',
  styleUrls: ['./UpdateMoviesNowShowing.component.css']
})
export class UpdateMoviesNowShowingComponent implements OnInit {

  dataId: any;
  public movie: moviedata = {} as moviedata;

  constructor(
    private service: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log("UpdateMoviesNowShowing Component Initialized");

    this.route.paramMap.subscribe((param: Params) => {
      this.dataId = param['get']('id')
    })

    this.service.getMovieNowShowingById(this.dataId).subscribe((data: any) => {
      this.movie = data;
      this.logger.log(`Fetched movie data for update: ${JSON.stringify(this.movie)}`);
    })
  }

  updateNS() {
    this.service.updateMovieNowShowing(this.movie, this.dataId).subscribe((data: any) => {
      this.logger.log(`Updated movie data: ${JSON.stringify(this.movie)}`);
      this.router.navigateByUrl('/Admin');
    })
  }
}
