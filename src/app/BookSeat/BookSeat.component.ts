import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { LoginService } from '../login.service';
import { RegisterService } from '../Register.service';
import { environment } from 'src/assets/environments/environment';
import { LoggerService } from '../logger.service';

interface Seat {
  id: number;
  row: number;
  column: number;
  price: number;
  status: 'available' | 'selected' | 'reserved';
}

interface FoodAndBeverage {
  id: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-BookSeat',
  templateUrl: './BookSeat.component.html',
  styleUrls: ['./BookSeat.component.css'],
})
export class BookSeatComponent implements OnInit, OnDestroy {
  seats: Seat[] = [];
  selectedSeats: Seat[] = [];
  originalPrice: number = 0;
  discountedPrice: number = 0;
  selectedSeatCount: any;
  showBookSeatButton = false;
  convenienceFees: number = 20;
  contributeToMovieGrip: number = 3;
  totalPrice: number = 0;
  finalAmount: number = 0;

  selectedMovie: any;
  selectedDate: any;
  selectedTime: any;
  selectedCity: any;
  selectedTheatre: any;

  startDate: any;
  endDate: any;
  countdown: any;
  countdownInterval: any;
  discountEnabled: boolean = true;

  foodAndBeverages: FoodAndBeverage[] = [];
  foodAndBeveragesPopupVisible: boolean = false;
  selectedFoodAndBeverages: FoodAndBeverage[] = [];
  originalFoodAndBeverages: FoodAndBeverage[] = [];
  totalSnacksPrice: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private StoreService: StorageService,
    private discountService: LoginService,
    private service: RegisterService,
    private logger: LoggerService
  ) {
    const storedSeats = localStorage.getItem('seats');
    if (storedSeats) {
      this.seats = JSON.parse(storedSeats);
      this.updateTotalPriceAndSelectedSeats();
    } else {
      let id = 1;
      for (let row = 0; row <= 8; row++) {
        for (let col = 1; col <= 7; col++) {
          const seat: Seat = {
            id,
            row,
            column: col,
            price: 150,
            status: 'available',
          };
          this.seats.push(seat);
          id++;
        }
      }

      this.http.get<FoodAndBeverage[]>(environment.foodBeveragesUrl)
        .subscribe((data) => {
          this.foodAndBeverages = data;
          this.originalFoodAndBeverages = data.map((item) => ({
            ...item, quantity: 0
          }));
        });
    }

    const storedContribution = sessionStorage.getItem('contribution');
    if (storedContribution) {
      this.contributeToMovieGrip = parseInt(storedContribution);
      this.updateFinalAmount();
    }
  }

  // Food And Beverages Popup

  openFoodAndBeveragesPopup() {
    this.foodAndBeveragesPopupVisible = true;
  }

  closeFoodAndBeveragesPopup() {
    // Restore original prices from the originalFoodAndBeverages array
    this.selectedFoodAndBeverages.forEach((item) => {
      const originalItem = this.originalFoodAndBeverages.find(
        (original) => original.id === item.id
      );
      if (originalItem) {
        item.price = originalItem.price;
      }
    });

    this.foodAndBeveragesPopupVisible = false;
    this.updateFinalAmount();
  }

  resetFoodAndBeveragesPopup() {
    this.selectedFoodAndBeverages.forEach((item) => {
      item.quantity = 0;
    });

    this.totalSnacksPrice = 0;
    this.updateFinalAmount();
  }

  onAddFoodAndBeverage(item: FoodAndBeverage) {
    item.quantity++;
    if (!this.selectedFoodAndBeverages.includes(item)) {
      this.selectedFoodAndBeverages.push(item);
    }
    this.updateFinalAmount();
  }

  onRemoveFoodAndBeverage(item: FoodAndBeverage) {
    if (item.quantity > 0) {
      item.quantity--;
      this.updateFinalAmount();
    }
  }

  getTotalFoodAndBeveragesPrice() {
    return this.selectedFoodAndBeverages.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );
  }

  confirmSnacks() {
    this.totalSnacksPrice = this.selectedFoodAndBeverages.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );

    this.foodAndBeveragesPopupVisible = false;
    this.updateFinalAmount();
  }

  ngOnInit() {

    this.logger.log("BookSeat Component Initialized");

    this.startDate = new Date('2023-08-08T10:00'); // Start date and time
    this.endDate = new Date('2023-08-10T18:00'); // End date and time

    this.calculateCountdown();
    this.startCountdown();

    // Retrieve the selected movie, date, time, city, and theater from the RegisterService
    const bookingDetails = this.service.getBookingDetails();

    this.selectedMovie = bookingDetails.movie;
    this.selectedDate = bookingDetails.date;
    this.selectedTime = bookingDetails.time;
    this.selectedCity = bookingDetails.city;
    this.selectedTheatre = bookingDetails.theatre;

    // Fetch the seat data from the database for the selected movie, date, time, city, and theatre
    this.fetchSeatData(this.selectedCity, this.selectedTheatre);
  }

  ngOnDestroy() {
    this.logger.log("Destroying BookSeat Component");
    clearInterval(this.countdownInterval);
  }

  calculateCountdown() {
    const now = new Date().getTime();
    const endTime = this.endDate.getTime();
    this.countdown = Math.max(0, endTime - now);
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.calculateCountdown();
      if (this.countdown <= 0) {
        this.stopCountdown();
        this.discountEnabled = false;
        return;
      }
    }, 1000);
  }

  stopCountdown() {
    clearInterval(this.countdownInterval);
  }

  formatCountdown() {
    const days = Math.floor(this.countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (this.countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((this.countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((this.countdown % (1000 * 60)) / 1000);
    const formattedDays = this.padDigits(days, 2);
    const formattedHours = this.padDigits(hours, 2);
    const formattedMinutes = this.padDigits(minutes, 2);
    const formattedSeconds = this.padDigits(seconds, 2);

    return `${formattedDays}D ${formattedHours}H ${formattedMinutes}M ${formattedSeconds}S`;
  }

  padDigits(number: number, digits: number) {
    return String(number).padStart(digits, '0');
  }

  onSeatClick(seat: Seat) {
    if (seat.status === 'available') {
      seat.status = 'selected';
      this.selectedSeats.push(seat);
    } else if (seat.status === 'selected') {
      seat.status = 'available';
      const index = this.selectedSeats.indexOf(seat);
      this.selectedSeats.splice(index, 1);
    } else if (seat.status === 'reserved') {
      alert('This seat is already reserved.');
    }

    this.updateTotalPriceAndSelectedSeats();
  }

  onSubmit() {
    if (this.selectedSeats.length > 0) {
      this.selectedSeats.forEach((seat) => {
        seat.status = 'reserved';
      });

      const seatData = this.selectedSeats.map((seat) => ({
        id: seat.id,
        row: seat.row,
        column: seat.column,
        price: seat.price,
        status: seat.status,
      }));

      const currentBooking = {
        seats: this.selectedSeats.length,
        totalPrice: this.finalAmount,
        seatData: seatData,
      };

      const previousBooking: { seatData?: Seat[] } = this.StoreService.getData();
      const previousSeatData: Seat[] = Array.isArray(previousBooking?.seatData)
        ? previousBooking.seatData
        : [];
      const mergedSeatData: Seat[] = previousSeatData.concat(currentBooking.seatData);

      const mergedBooking = {
        seats: currentBooking.seats,
        totalPrice: currentBooking.totalPrice,
        seatData: mergedSeatData,
      };

      this.StoreService.storedata(mergedBooking);

      const movieSeats = {
        movie: this.selectedMovie,
        date: this.selectedDate,
        time: this.selectedTime,
        city: this.selectedCity,
        theatre: this.selectedTheatre,
        seatData: mergedBooking.seatData,
      };

      this.http.post(environment.movieSeatsUrl, movieSeats).subscribe(() => {
        const navigationExtras = {
          state: { totalPrice: this.finalAmount }, // Pass totalPrice through state
        };
        this.router.navigate(['/Payment'], navigationExtras);
        alert('Seats booked successfully!');
      });
    } else {
      alert('Please select at least one seat.');
    }
  }

  updateTotalPriceAndSelectedSeats() {
    this.originalPrice = this.selectedSeats.reduce((total, seat) => {
      if (seat.status === 'selected' || seat.status === 'available') {
        return total + seat.price;
      } else {
        return total;
      }
    }, 0);

    this.selectedSeatCount = this.selectedSeats.filter(
      (seat) => seat.status === 'selected'
    ).length;

    if (this.discountEnabled) {
      if (this.selectedSeatCount >= 8) {
        this.discountedPrice = this.originalPrice * 0.8; // 20% discount
      } else if (this.selectedSeatCount >= 4) {
        this.discountedPrice = this.originalPrice * 0.9; // 10% discount
      } else {
        this.discountedPrice = this.originalPrice;
      }
    } else {
      this.discountedPrice = this.originalPrice;
    }

    this.updateFinalAmount();
  }

  removeContribution() {
    this.contributeToMovieGrip = 0;
    this.updateFinalAmount();
  }

  updateFinalAmount() {
    const totalAmount =
      this.discountedPrice +
      this.totalSnacksPrice +
      this.selectedSeatCount * this.convenienceFees +
      this.contributeToMovieGrip;
    this.finalAmount = totalAmount;
  }

  fetchSeatData(city: string, theatre: string) {
    this.logger.log("Fetching seat data for selected movie");
    this.http.get<any[]>(environment.movieSeatsUrl).subscribe((data) => {
      const matchingSeats = data.filter(
        (booking) =>
          booking.movie === this.selectedMovie &&
          booking.date === this.selectedDate &&
          booking.time === this.selectedTime &&
          booking.city === city &&
          booking.theatre === theatre
      );

      if (matchingSeats.length > 0) {
        const mergedSeats = matchingSeats.reduce((merged, seatData) => {
          return merged.concat(seatData.seatData);
        }, []);

        this.seats.forEach((seat) => {
          const matchingSeat = mergedSeats.find((s: { id: number }) => s.id === seat.id);
          if (matchingSeat) {
            seat.status = matchingSeat.status;
            seat.price = matchingSeat.status === 'reserved' ? '' : matchingSeat.price;
          }
        });

        this.service.setCityAndTheatre(city, theatre);

        // Store the current seats data in StorageService
        const seatData = this.selectedSeats.map((seat) => ({
          id: seat.id,
          row: seat.row,
          column: seat.column,
          price: seat.price,
          status: seat.status,
        }));

        const currentSeatsData = {
          seats: this.selectedSeats.length,
          totalPrice: this.finalAmount,
          seatData: seatData,
        };

        this.StoreService.storedata(currentSeatsData);
      }

      this.updateTotalPriceAndSelectedSeats();
    });
  }
}
