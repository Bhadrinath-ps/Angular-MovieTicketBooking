/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeatBookingService } from './seatBooking.service';

describe('Service: SeatBooking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeatBookingService]
    });
  });

  it('should ...', inject([SeatBookingService], (service: SeatBookingService) => {
    expect(service).toBeTruthy();
  }));
});
