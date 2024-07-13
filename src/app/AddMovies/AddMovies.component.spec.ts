import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'; 
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AddMoviesComponent } from './AddMovies.component';

describe('AddMoviesComponent', () => {
  let component: AddMoviesComponent;
  let fixture: ComponentFixture<AddMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddMoviesComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule], // Add ReactiveFormsModule
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
