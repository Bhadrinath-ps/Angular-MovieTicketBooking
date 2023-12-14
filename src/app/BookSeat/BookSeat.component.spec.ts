import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookSeatComponent } from './BookSeat.component';

describe('BookSeatComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BookSeatComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BookSeatComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
