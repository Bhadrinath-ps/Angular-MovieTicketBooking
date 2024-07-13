import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../confirm.validator';
import { RegisterService } from '../Register.service';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
  styles: ['input.ng-invalid{border: 3px solid red;} input.ng-valid{border: 3px solid green;}']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private logger: LoggerService) { }

  ngOnInit(): void {
    this.logger.log("Register Component Initialized");
  }

  showPassword = false;

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  showCPassword = false;

  toggleShowCP() {
    this.showCPassword = !this.showCPassword;
  }

  registerForm = this.formBuilder.group({
    profilepic: ['/assets/images/Profile/Profile-UserImage.jpg'],
    username: ['', [Validators.required, Validators.pattern("^(?!.*([a-zA-Z0-9!@#$%^&*])\\1{3})[a-zA-Z][a-zA-Z0-9!@#$%^&*]{4,12}$")]],
    email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$")]],
    phone: ['', [Validators.required, Validators.pattern("([6-9])([0-9]{9,9})")]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")]],
    cpassword: ['', [Validators.required]]
  }, { validator: ConfirmedValidator('password', 'cpassword') })

  signUp() {
    this.http.get<any>(environment.registerUrl).subscribe(res => {
      const user = res.find((result: any) => {
        return result.email === this.registerForm.value.email;
      });

      if (user) {
        this.logger.log("Email Already Exists");
        alert("Email Already Exists");
      }

      else {
        this.http.post<any>(environment.registerUrl, this.registerForm.value).subscribe((data) => {
          this.logger.log("Registration Successful!");
          alert("Registration Successful!");
          this.router.navigate(['/Login']);
        });
      }
    });
  }
}
