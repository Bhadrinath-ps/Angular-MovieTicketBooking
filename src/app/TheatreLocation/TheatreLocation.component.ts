import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../Register.service';
import { StorageService } from '../storage.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-TheatreLocation',
  templateUrl: './TheatreLocation.component.html',
  styleUrls: ['./TheatreLocation.component.css']
})
export class TheatreLocationComponent implements OnInit {

  theatreForm: FormGroup;
  selectedState: string = '';
  selectedCity: string = '';
  selectedTheatre: string = '';

  states: any[] = [
    {
      name: 'Tamil Nadu',
      cities: [
        { name: 'Salem', theatres: ["Inox Cinemas", "Aascars Multiplex", "ARRS Multiplex Theatre", "Kailash Prakash Theatre", "K.S Theatre"] },
        { name: 'Chennai', theatres: ["Jazz Cinemas LUXE", "Mayajaal Multiplex", "PVR Cinemas Skywalk", "Sathyam Cinemas", "Sangam Cinemas"] }
      ]
    }
  ];

  cities: any[] = [];

  theatres: any[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private logger: LoggerService
  ) {
    this.theatreForm = this.formBuilder.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      theatre: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.theatreForm.valid) {
      const { city, theatre } = this.theatreForm.value;
      this.registerService.setCityAndTheatre(city, theatre);
      this.logger.log(`Selected city: ${city}, Selected theatre: ${theatre}`);
      this.router.navigate(['/BookTicket']);
    }
  }

  ngOnInit(): void {
    this.logger.log("TheatreLocation Component Initialized");
  }

  stateChanged(event: any) {
    this.selectedState = event.target.value;
    this.cities = this.states.find(c => c.name === this.selectedState).cities;
    this.theatreForm.controls['city'].setValue(''); // Reset selected city
    this.theatreForm.controls['theatre'].setValue(''); // Reset selected theatre

    this.logger.log(`Selected state: ${this.selectedState}`);
  }

  cityChanged(event: any) {
    this.selectedCity = event.target.value;
    const selectedState = this.states.find(c => c.name === this.selectedState);
    const selectedCity = selectedState?.cities.find((s: { name: string; theatres: string[] }) => s.name === this.selectedCity);
    this.theatres = selectedCity?.theatres || [];
    this.theatreForm.controls['theatre'].setValue(''); // Reset selected theatre

    this.registerService.setTheatres(this.theatres);
    this.logger.log(`Selected city: ${this.selectedCity}`);
  }
}
