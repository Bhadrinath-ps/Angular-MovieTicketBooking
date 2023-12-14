import { TestBed } from '@angular/core/testing';

import { DeactivateGuard } from './deactivate.guard';

describe('DeactivateGuard', () => {
  let guard: DeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeactivateGuard], 
    });
    guard = TestBed.inject(DeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
