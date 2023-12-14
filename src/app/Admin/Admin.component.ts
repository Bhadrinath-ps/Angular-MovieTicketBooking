import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RegisterService } from '../Register.service';
import { LoginService } from '../login.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent implements OnInit {

  userregistered: any = "";
  movieList1: any = "";
  movieList2: any = "";
  contactUs: any = "";
  tickets: any = "";
  displayIds: number = 3;
  showMore: boolean = false;

  constructor(
    private service: RegisterService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log("Admin Component Initialized");
    this.loadUserData();
    this.loadMovieData();
    this.loadFeedbackData();
    this.loadTicketData();
  }

  loadUserData() {
    this.service.registration().subscribe((data) => {
      this.userregistered = data;
      this.logger.log("User data loaded");
    });
  }

  loadMovieData() {
    this.service.movieNowShowing().subscribe(data => {
      this.movieList1 = data;
      this.logger.log("'Now Showing' movies data loaded");
    });

    this.service.movieUpcoming().subscribe(data => {
      this.movieList2 = data;
      this.logger.log("'Upcoming' movies data loaded");
    });
  }

  loadFeedbackData() {
    this.service.feedback().subscribe(data => {
      this.logger.log("Feedback data loaded");
      this.contactUs = data;
    });
  }

  loadTicketData() {
    this.service.ticket().subscribe(data => {
      this.tickets = data;
      this.tickets.forEach((data: any) => {
        const currentDate = new Date();
        const ticketDate = new Date(data.date);

        // Set hours, minutes, seconds, and milliseconds to 0 for both dates
        currentDate.setHours(0, 0, 0, 0);
        ticketDate.setHours(0, 0, 0, 0);

        if (ticketDate < currentDate) {
          data.status = 'Expired';
        } else if (ticketDate.getTime() === currentDate.getTime()) {
          data.status = 'Expiring Today';
        } else {
          data.status = 'Active';
        }
      });
      this.logger.log("Ticket data loaded");
    });

  }

  delShowing(id: any) {
    if (confirm("Confirm Delete Movie")) {
      this.service.delMovieNowShowing(id).subscribe(data => {
        this.logger.info(`Deleted Movie Now Showing with ID ${id}`);
        alert("Deleted Successfully!!");
        this.loadMovieData();
      });
    }
  }

  delComing(id: any) {
    if (confirm("Confirm Delete Movie")) {
      this.service.delMovieUpcoming(id).subscribe(data => {
        this.logger.info(`Deleted Movie Upcoming with ID ${id}`);
        alert("Deleted Successfully!!");
        this.loadMovieData();
      });
    }
  }

  delUserFeedback(id: any) {
    if (confirm("Confirm Delete Feedback")) {
      this.service.delFeedback(id).subscribe(data => {
        this.logger.info(`Deleted Feedback with ID ${id}`);
        alert("Deleted Successfully!!");
        this.loadFeedbackData();
      });
    }
  }

  delUserTicket(id: any) {
    if (confirm("Confirm Delete Ticket")) {
      this.service.delTicket(id).subscribe(data => {
        this.logger.info(`Deleted Ticket with ID ${id}`);
        alert("Deleted Successfully!!");
        this.loadTicketData();
      });
    }
  }

  // Hide or Show User Registered

  toggleShowMore() {
    this.showMore = !this.showMore;
    this.logger.info(`Toggled showMore property: ${this.showMore}`);
  }

}
