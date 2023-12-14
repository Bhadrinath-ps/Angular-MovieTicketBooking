import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-ContactUs',
  templateUrl: './ContactUs.component.html',
  styleUrls: ['./ContactUs.component.css']
})
export class ContactUsComponent implements OnInit {

  public contactUs !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log("ContactUs Component Initialized");

    this.contactUs = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^(?!.*([a-zA-Z0-9!@#$%^&*])\\1{3})[a-zA-Z][a-zA-Z0-9!@#$%^&*]{4,12}$")]],
      email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$")]],
      phone: ['', [Validators.required, Validators.pattern("([6-9])([0-9]{9,9})")]],
      query: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  cu_form() {
    this.logger.log("Submitting Contact Us form...");

    this.http.post<any>(environment.contactUsUrl, this.contactUs.value)
      .subscribe((data) => {
        this.contactUs.reset();
        this.logger.log("Contact Us form submitted successfully!");
      });
  }

  isPopupOpen = false;

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }
}
