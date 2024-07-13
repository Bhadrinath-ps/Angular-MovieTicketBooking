import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Payment',
  templateUrl: './Payment.component.html',
  styleUrls: ['./Payment.component.css'],
  styles: ['input.ng-invalid{border: 2px solid red;} input.ng-valid{border: 1px solid green;}']
})
export class PaymentComponent implements OnInit {
  @Input() totalPrice: number | null = null;

  showTicketButton = false;

  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private StoreService: StorageService,
    private logger: LoggerService
  ) {

    this.logger.log(JSON.stringify(this.StoreService.getData()));

    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && 'totalPrice' in state) {
      this.totalPrice = state['totalPrice'];
    }
  }

  ngOnInit(): void {
    this.logger.log("Payment Component Initialized");
  }

  paymentForm = this.FormBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    ccv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
    cardnumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
    month_and_year: ['', [Validators.required]]
  })

  payment() {
    this.logger.log("Payment button clicked");

    var logindata = JSON.parse(sessionStorage.getItem("userdata") + "");
    var bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails") + "");
    console.log(logindata);
    console.log(bookingDetails);

    var emaildata = {
      email: logindata.email
    }

    var bookingDetail = {
      movie_selection: bookingDetails.movie,
      date: bookingDetails.date,
      time_slot: bookingDetails.time,
      city: bookingDetails.city,
      theatre: bookingDetails.theatre
    }

    this.StoreService.storedata(emaildata);
    this.StoreService.storedata(bookingDetail)
    this.StoreService.storedata(this.paymentForm.value);

    this.http.post<any>(environment.totalDataUrl, this.StoreService.getData())
      .subscribe(data => {
        this.logger.log("Payment Successful!");
        alert("Payment Successful!");
        this.paymentForm.reset();
      }, err => {
        this.logger.log("Payment Failure");
      })
  }

  isPopupOpen = false;

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }
}
