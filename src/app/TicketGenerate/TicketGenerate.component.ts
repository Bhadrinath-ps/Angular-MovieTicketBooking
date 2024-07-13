import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../Register.service';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-TicketGenerate',
  templateUrl: './TicketGenerate.component.html',
  styleUrls: ['./TicketGenerate.component.css']
})
export class TicketGenerateComponent implements OnInit {
  totaldata: any = '';
  loginEmail: any = '';
  currentDate: string = '';

  constructor(
    private http: HttpClient,
    private service: RegisterService,
    private logger: LoggerService
  ) {
    this.loginEmail = this.service.getemail();
    this.logger.log(`Login email: ${this.loginEmail}`);
  }

  ngOnInit() {
    this.logger.log("TicketGenerate Component Initialized");

    this.http.get(environment.totalDataUrl).subscribe((data: any) => {
      this.totaldata = data.filter((data: any) => data.email === this.loginEmail);
      this.totaldata.forEach((data: any) => {
        const currentDate = new Date(); // Get the current date and time
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
    });

    this.currentDate = this.formatDate(new Date());
    this.logger.log(`Current date: ${this.currentDate}`);
  }

  print() {
    window.print();
    this.logger.log('Print button clicked');
  }

  deleteTicket(id: number) {
    if (confirm("Confirm Delete Ticket")) {
      this.http.delete(`${environment.totalDataUrl}${id}`).subscribe(() => {
        this.logger.log(`Ticket with ID ${id} deleted successfully.`);
        this.totaldata = this.totaldata.filter((data: any) => data.id !== id);
      });
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  private formatTime(date: Date): string {
    const hours: any = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = this.padZero(hours % 12 || 12);

    return `${formattedHours}:${minutes}${ampm}`;
  }

  private padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
