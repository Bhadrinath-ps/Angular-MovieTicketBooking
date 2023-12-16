import { Component, Input, OnInit } from '@angular/core';
import { RegisterService } from '../Register.service';

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

  selectedIndex = 0;

  constructor(private service: RegisterService) { }

  ngOnInit() {
        this.service.movieNowShowing().subscribe(data => {
      this.movieList1 = data;
    });

    this.service.movieUpcoming().subscribe(data => {
      this.movieList2 = data;
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
        'https://i.ibb.co/92NKx1T/zyro-image.jpg',
      imageAlt: 'Coco',
    },
    {
      imageSrc:
        'https://lumiere-a.akamaihd.net/v1/images/au_disneyplus_pixar_luca_payoffart_hero_r_ebeb5cf1.jpeg',
      imageAlt: 'Luca',
    },
    {
      imageSrc:
        'https://i.ibb.co/YP3JbBy/onward-et00122110-26-12-2019-01-03-42-transformed.jpg',
      imageAlt: 'Onward',
    },
    {
      imageSrc:
        'https://i.ibb.co/JCTkBqG/image-O-JCCJSWf-transformed.png',
      imageAlt: 'Zootopia',
    },
  ]

}

