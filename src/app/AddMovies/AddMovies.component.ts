import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-AddMovies',
  templateUrl: './AddMovies.component.html',
  styleUrls: ['./AddMovies.component.css'],
  styles: ['input.ng-invalid{border: 3px solid red;} input.ng-valid{border: 3px solid green;}']
})
export class AddMoviesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log("AddMovies Component Initialized");
  }

  addMoviesForm = this.formBuilder.group({
    category: ['', [Validators.required,]],
    pic: ['', [Validators.required,]],
    background: ['', [Validators.required,]],
    title: ['', [Validators.required,]],
    link: ['', [Validators.required,]],
    year_duration: ['', [Validators.required,]],
    imdb: ['', [Validators.required,]],
    popularity: ['', [Validators.required,]],
    movieimg: ['', [Validators.required,]],
    movievid: ['', [Validators.required,]],
    description1: ['', [Validators.required,]],
    description2: ['', [Validators.required,]],
    castpic1: ['', [Validators.required,]],
    castpic2: ['', [Validators.required,]],
    castpic3: ['', [Validators.required,]],
    castpic4: ['', [Validators.required,]],
    castname1: ['', [Validators.required,]],
    castname2: ['', [Validators.required,]],
    castname3: ['', [Validators.required,]],
    castname4: ['', [Validators.required,]],
    castname11: ['', [Validators.required,]],
    castname22: ['', [Validators.required,]],
    castname33: ['', [Validators.required,]],
    castname44: ['', [Validators.required,]],
    reviewpic1: ['', [Validators.required,]],
    reviewpic2: ['', [Validators.required,]],
    reviewpic3: ['', [Validators.required,]],
    reviewpic4: ['', [Validators.required,]],
    reviewname1: ['', [Validators.required,]],
    reviewname2: ['', [Validators.required,]],
    reviewname3: ['', [Validators.required,]],
    reviewname4: ['', [Validators.required,]],
    reviewdes1: ['', [Validators.required,]],
    reviewdes2: ['', [Validators.required,]],
    reviewdes3: ['', [Validators.required,]],
    reviewdes4: ['', [Validators.required,]],
  });

  addMovies() {
    if (this.addMoviesForm.value.category === "movieNowShowing") {
      this.http.post(environment.movieNowShowingUrl, this.addMoviesForm.value).subscribe((data) => {
        this.logger.log("Movies added successfully to 'Now Showing' category");
        alert("Movies added successfully!!");
        this.router.navigateByUrl('/Admin');
      });
    }

    else if (this.addMoviesForm.value.category === "movieUpcoming") {
      this.http.post(environment.movieUpcomingUrl, this.addMoviesForm.value).subscribe(data => {
        this.logger.log("Movies added successfully to 'Upcoming' category");
        alert("Movies added successfully!!");
        this.router.navigateByUrl('/Admin');
      });
    }
  }
}
