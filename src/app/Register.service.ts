import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { moviedata } from './movieModel';
import { profiledata } from './profileModel';
import { Router } from '@angular/router';
import { BehaviorSubject, interval } from 'rxjs';
import { environment } from 'src/assets/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  private login: any;

  public isLogin() {
    if (this.login == null) {
      return false;
    }
    return true;
  }

  public load(data: any) {
    this.login = data;
  }

  public getname() {
    return this.login;
  }

  public getemail() {
    return this.login?.email || '';
  }

  public isadmin() {
    if (this.login != null) {
      return this.login.role === 'admin';
    }
    return false;
  }

  private startDate: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);
  private endDate: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);
  private remainingTime: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  setDiscountDates(startDate: Date | null, endDate: Date | null): void {
    this.startDate.next(startDate);
    this.endDate.next(endDate);

    if (startDate && endDate) {
      localStorage.setItem('startDate', startDate.toISOString());
      localStorage.setItem('endDate', endDate.toISOString());
    } else {
      localStorage.removeItem('startDate');
      localStorage.removeItem('endDate');
    }
  }

  getRemainingTime(): BehaviorSubject<number> {
    return this.remainingTime;
  }

  getStartDate(): BehaviorSubject<Date | null> {
    return this.startDate;
  }

  getEndDate(): BehaviorSubject<Date | null> {
    return this.endDate;
  }

  // Selected City and Theatre to Store in SessionStorage

  selectedCity: any;
  selectedTheatre: any;
  selectedTheatres: any[] = [];

  setCityAndTheatre(city: string, theatre: string) {
    this.selectedCity = city;
    this.selectedTheatre = theatre;
  }

  setTheatres(theatres: any[]) {
    this.selectedTheatres = theatres;
  }

  getCityAndTheatre() {
    return {
      city: this.selectedCity,
      theatre: this.selectedTheatre
    };
  }

  // Shows Movie Details in BookSeat

  selectedMovie: any;
  selectedDate: any;
  selectedTime: any;

  private sessionStorageKey = 'bookingDetails';

  setBookingDetails(movie: string, date: string, time: string) {
    const bookingDetails = { movie, date, time, city: this.selectedCity, theatre: this.selectedTheatre };
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(bookingDetails));
  }

  getBookingDetails() {
    const bookingDetailsString = sessionStorage.getItem(this.sessionStorageKey);
    return bookingDetailsString ? JSON.parse(bookingDetailsString) : null;
  }

  clearBookingDetails() {
    sessionStorage.removeItem(this.sessionStorageKey);
  }

  constructor(private http: HttpClient, private route: Router) {

    this.login = JSON.parse(sessionStorage.getItem('login') || '{}');

    interval(1000).subscribe(() => {
      const currentDate = new Date();
      const endDate = this.endDate.getValue();
      if (endDate && currentDate < endDate) {
        const remainingMilliseconds = endDate.getTime() - currentDate.getTime();
        const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
        this.remainingTime.next(remainingSeconds);
      } else {
        this.remainingTime.next(0);
      }
    });
  }

  // setUsername(username: string) {
  //   this.username = username;
  // }

  // getUsername() {
  //   return this.username;
  // }


  // For User Registration

  registration() {
    return this.http.get(environment.registerUrl);
  }

  // For Movie Description - Movies Now Showing

  movieNowShowing() {
    return this.http.get<moviedata[]>(environment.movieNowShowingUrl);
  }

  updateMovieNowShowing(MovieNowShowing: moviedata, id: any) {
    return this.http.put(environment.movieNowShowingUrl + id, MovieNowShowing);
  }

  // Edit Movie Now Showing

  getMovieNowShowingById(id: any) {
    return this.http.get(environment.movieNowShowingUrl + id);
  }

  delMovieNowShowing(id: any) {
    return this.http.delete(environment.movieNowShowingUrl + id);
  }

  // For Movie Description - Movies Upcoming

  movieUpcoming() {
    return this.http.get<moviedata[]>(environment.movieUpcomingUrl);
  }

  updateMovieUpcoming(MovieUpcoming: moviedata, id: any) {
    return this.http.put(environment.movieUpcomingUrl + id, MovieUpcoming);
  }

  // Edit Movie Now Showing

  getMovieUpcomingById(id: any) {
    return this.http.get(environment.movieUpcomingUrl + id);
  }

  delMovieUpcoming(id: any) {
    return this.http.delete(environment.movieUpcomingUrl + id);
  }

  // theatre() {
  //   return this.client.get("http://localhost:3000/theatreSelection");
  // }

  // movie() {
  //   return this.client.get("http://localhost:3000/movieSelection");
  // }

  // seat() {
  //   return this.client.get("http://localhost:3000/seats");
  // }

  // Contact US Details

  feedback() {
    return this.http.get(environment.contactUsUrl);
  }

  delFeedback(id: any) {
    return this.http.delete(environment.contactUsUrl + id);
  }

  // Ticket Details

  ticket() {
    return this.http.get(environment.totalDataUrl);
  }

  delTicket(id: any) {
    return this.http.delete(environment.totalDataUrl + id);
  }

  // Profiles Button

  profiles() {
    return this.http.get<profiledata[]>(environment.registerUrl);
  }

  getProfilesById(id: any) {
    return this.http.get(environment.registerUrl + id);
  }

  // Profiles Action

  updateProfiles(Profile: profiledata, id: any) {
    return this.http.put(environment.registerUrl + id, Profile);
  }

  // delProfile(id: any) {
  //   return this.http.delete("http://localhost:3000/registration/" + id);
  // }
}

