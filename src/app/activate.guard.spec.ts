import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivateGuard } from './activate.guard';
import { RegisterService } from './Register.service';

describe('AuthGuard', () => {
  let guard: ActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ActivateGuard, RegisterService]
    });
    guard = TestBed.inject(ActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
