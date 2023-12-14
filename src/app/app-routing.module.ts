import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateGuard } from './activate.guard';
import { AddMoviesComponent } from './AddMovies/AddMovies.component';
import { AdminComponent } from './Admin/Admin.component';
import { BookSeatComponent } from './BookSeat/BookSeat.component';
import { BookTicketComponent } from './BookTicket/BookTicket.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { DeactivateGuard } from './deactivate.guard';
import { HomeComponent } from './Home/Home.component';
import { IndexComponent } from './Index/Index.component';
import { LoginProtectionGuard } from './login-protection.guard';
import { LoginComponent } from './Login/Login.component';
import { MovieDescriptionComponent } from './MovieDescription/MovieDescription.component';
import { PaymentComponent } from './Payment/Payment.component';
import { RegisterComponent } from './Register/Register.component';
import { TheatreLocationComponent } from './TheatreLocation/TheatreLocation.component';
import { TicketGenerateComponent } from './TicketGenerate/TicketGenerate.component';
import { UpdateMoviesNowShowingComponent } from './UpdateMoviesNowShowing/UpdateMoviesNowShowing.component';
import { UpdateMoviesUpcomingComponent } from './UpdateMoviesUpcoming/UpdateMoviesUpcoming.component';
import { ProfileComponent } from './Profile/Profile.component';
import { EditProfileComponent } from './EditProfile/EditProfile.component';
import { PageNotFoundComponent } from './PageNotFound/PageNotFound.component';
import { HeaderComponent } from './Header/Header.component';
import { ActivateAdminGuard } from './activate-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Welcome to MovieGrip',
      },
      {
        path: 'Admin',
        component: AdminComponent,
        title: 'Admin',
        // canActivate: [ActivateAdminGuard]
      },
      {
        path: 'AddMovies',
        component: AddMoviesComponent,
        title: 'Admin - Add Movies',
        // canActivate: [ActivateAdminGuard]
      },
      {
        path: 'UpdateMoviesNowShowing/:id',
        component: UpdateMoviesNowShowingComponent,
        title: 'Admin - Update Movies',
        // canActivate: [ActivateAdminGuard]
      },
      {
        path: 'UpdateMoviesUpcoming/:id',
        component: UpdateMoviesUpcomingComponent,
        title: 'Admin - Update Movies',
        // canActivate: [ActivateAdminGuard]
      },
      {
        path: 'Login',
        component: LoginComponent,
        canActivate: [LoginProtectionGuard],
        title: 'Login'
      },
      {
        path: 'Home',
        component: HomeComponent,
        title: 'Welcome to MovieGrip',
      },
      {
        path: 'Home/:check',
        component: MovieDescriptionComponent,
        title: 'Movies Description',
      },
      {
        path: 'Register',
        component: RegisterComponent,
        title: 'Registeration',
        canActivate: [LoginProtectionGuard]
        // canDeactivate: [DeactivateGuard]
      },
      {
        path: 'BookTicket',
        component: BookTicketComponent,
        title: 'Booking Ticket'
      },
      {
        path: 'Theatre',
        component: TheatreLocationComponent,
        title: 'Theatre Location',
        canActivate: [ActivateGuard]
      },
      {
        path: 'BookSeat',
        component: BookSeatComponent,
        title: 'Seat Slots'
      },
      {
        path: 'Payment',
        component: PaymentComponent,
        title: 'Payment'
      },
      {
        path: 'TicketGenerate',
        component: TicketGenerateComponent,
        title: 'Tickets History'
      },
      {
        path: 'ContactUs',
        component: ContactUsComponent,
        title: 'Contact Us & Feedback'
      },
      {
        path: 'Profile',
        component: ProfileComponent,
        title: 'Profile'
      },
      {
        path: 'EditProfile/:id',
        component: EditProfileComponent,
        title: 'Edit Profile'
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
