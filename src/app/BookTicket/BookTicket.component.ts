import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../Register.service';
import { StorageService } from '../storage.service';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-BookTicket',
  templateUrl: './BookTicket.component.html',
  styleUrls: ['./BookTicket.component.css']
})
export class BookTicketComponent implements OnInit {

  movieList: any = [];
  currentDate: any;
  minDate: string = '';
  maxDate: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private StoreService: StorageService,
    private service: RegisterService,
    private logger: LoggerService) { }


  ngOnInit() {
    this.logger.log("BookTicket Component Initialized");

    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);

    const oneWeekLater = new Date();
    oneWeekLater.setDate(this.currentDate.getDate() + 7);

    this.minDate = this.formatDate(this.currentDate);
    this.maxDate = this.formatDate(oneWeekLater);

    this.service.movieNowShowing().subscribe(data => {
      this.movieList = data;
    });
  }

  bookTicket = this.formBuilder.group({
    movie_selection: ['', Validators.required],
    date: [this.minDate, Validators.required],
    time_slot: ['', Validators.required]
  });

  isTimeSlotDisabled(timeSlot: string): boolean {
    const selectedDate = this.bookTicket.controls.date.value;
    const currentTime = new Date();
    const selectedTime = new Date(selectedDate + ' ' + timeSlot);

    return currentTime > selectedTime;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  ticket() {
    const selectedMovie: any = this.bookTicket.value.movie_selection;
    const selectedDate: any = this.bookTicket.value.date;
    const selectedTime: any = this.bookTicket.value.time_slot;

    this.service.setBookingDetails(selectedMovie, selectedDate, selectedTime);

    const movieSeats = {
      movie_selection: selectedMovie,
      date: selectedDate,
      time_slot: selectedTime
    };

    this.http.post(environment.movieSeatsUrl, movieSeats).subscribe(() => {
      this.logger.log("Movie Selection Successful!");
      this.router.navigate(['/BookSeat']);
      alert('Movie Selection Successful!');
    });
  }
}
