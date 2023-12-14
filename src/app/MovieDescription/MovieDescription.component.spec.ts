import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MovieDescriptionComponent } from './MovieDescription.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Import of

describe('MovieDescriptionComponent', () => {
  let component: MovieDescriptionComponent;
  let fixture: ComponentFixture<MovieDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MovieDescriptionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ check: 'movie-link' }) 
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
