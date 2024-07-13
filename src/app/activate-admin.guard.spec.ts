import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { ActivateAdminGuard } from './activate-admin.guard';
import { RegisterService } from './Register.service'; 

describe('ActivateAdminGuard', () => {
  let guard: ActivateAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ActivateAdminGuard, RegisterService]
    });
    guard = TestBed.inject(ActivateAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
