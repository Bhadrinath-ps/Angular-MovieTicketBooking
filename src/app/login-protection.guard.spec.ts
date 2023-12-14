import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

import { LoginProtectionGuard } from './login-protection.guard';

describe('LoginProtectionGuard', () => {
  let guard: LoginProtectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    guard = TestBed.inject(LoginProtectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
