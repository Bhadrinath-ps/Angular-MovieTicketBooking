import { TestBed, async, inject } from '@angular/core/testing';
import { RegisterService } from './Register.service';
import { HttpClientModule } from '@angular/common/http'; 

describe('Service: Register', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterService],
      imports: [HttpClientModule],
    });
  });

  it('should ...', inject([RegisterService], (service: RegisterService) => {
    expect(service).toBeTruthy();
  }));
});
