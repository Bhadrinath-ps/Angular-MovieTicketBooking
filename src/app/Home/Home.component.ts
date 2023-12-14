import { Component, Input, OnInit } from '@angular/core';
import { RegisterService } from '../Register.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() indicators = true;
  controls: boolean = true;

  movieList1: any = "";
  movieList2: any = "";
  contactUs: any = "";

  selectedIndex = 0;

  constructor(
    private service: RegisterService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log("Home Component Initialized");

    this.service.movieNowShowing().subscribe(data => {
      this.movieList1 = data;
      this.logger.log('Movie Now Showing data loaded');
    });

    this.service.movieUpcoming().subscribe(data => {
      this.movieList2 = data;
      this.logger.log('Movie Upcoming data loaded');
    });

    this.service.feedback().subscribe(data => {
      this.contactUs = data;
      this.logger.log('Feedback data loaded');
    });

    setInterval(() => {
      this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
    }, 3500);
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }

  onPrevClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  images = [
    {
      imageSrc:
        '/assets/images/Home/Slider/Coco.jpg',
      imageAlt: 'Coco',
    },
    {
      imageSrc:
        '/assets/images/Home/Slider/Luca.jpg',
      imageAlt: 'Luca',
    },
    {
      imageSrc:
        '/assets/images/Home/Slider/Onward.jpg',
      imageAlt: 'Onward',
    },
    {
      imageSrc:
        '/assets/images/Home/Slider/Zootopia.png',
      imageAlt: 'Zootopia',
    },
  ]

}

