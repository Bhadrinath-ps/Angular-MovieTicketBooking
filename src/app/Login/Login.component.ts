import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../Register.service';
import { ConfirmedValidator } from '../confirm.validator';
import { StorageService } from '../storage.service';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
  styles: ['input.ng-invalid{border: 3px solid red;} input.ng-valid{border: 3px solid green;}']
})
export class LoginComponent implements OnInit {

  email: any = "";
  emailNotFound: boolean = false;
  emailExists: boolean = false;
  newPassword: any = "";
  confirmPassword: any = "";
  userId: number | undefined;

  newPass: any = "";
  confirmPass: any = "";
  retUrl: any = 'login';
  forgotemail: any = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private slogin: RegisterService,
    private storeService: StorageService,
    private logger: LoggerService) { }

  showPassword = false;

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  showRNPassword = false;

  toggleRNPShow() {
    this.showRNPassword = !this.showRNPassword;
  }

  showRNCPassword = false;

  toggleRNCPShow() {
    this.showRNCPassword = !this.showRNCPassword;
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$")]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")]]
  });

  resetpass = this.formBuilder.group({
    newPass: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")]],
    confirmPass: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")]]
  });

  ngOnInit() {
    this.logger.log("Login Component Initialized");

    this.route.queryParamMap.subscribe(parama => {
      this.retUrl = parama.get('retUrl');
      console.log("LoginComponent/ngOnInit", parama);
    });
  }

  login() {
    this.http.get<any>(environment.registerUrl).subscribe(data => {
      const user = data.find((result: any) => {
        if (result.email === this.loginForm.value.email) {
          return result;
        }
      });

      if (!user) {
        this.logger.log("No user found");
        alert("No user found");
      } else if (user.password === this.loginForm.value.password) {
        this.logger.log("Login successful!");
        alert("Login successful!");
        sessionStorage.setItem('userdata', JSON.stringify(user));
        this.slogin.load(user);

        if (this.retUrl) {
          this.router.navigateByUrl(this.retUrl);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.logger.log("Invalid email or password");
        alert("Invalid email or password");
      }
      this.slogin.clearBookingDetails();
    });
  }

  logout(): void {
    this.logger.log("Logout requested");

    this.slogin.clearBookingDetails();
    sessionStorage.removeItem('userdata');
    this.slogin.load(null);
  }

  // Popup

  isPopupOpen = false;

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  // ForgotPassword

  checkEmail() {
    this.logger.log("Checking email...");

    this.emailNotFound = false;
    this.emailExists = false;

    this.http.get<any>(environment.registerUrl, { params: { email: this.email } }).subscribe((response) => {
      if (response.length > 0) {
        this.emailExists = true;
        this.userId = response[0].id;
        this.logger.log("Email ID granted");
        alert("Email ID granted");
      } else {
        this.emailNotFound = true;
      }
    })
  }

  resetPassword() {
    const updatedUser = {
      password: this.newPassword,
      cpassword: this.confirmPassword
    };

    this.http.patch(`${environment.registerUrl}${this.userId}`, updatedUser).subscribe(() => {
      this.logger.log('Password updated successfully');
      alert('Password updated successfully');
      window.location.reload();
    })
  }

  passwordsDoNotMatch(): boolean {
    return this.newPassword !== this.confirmPassword;
  }
}

