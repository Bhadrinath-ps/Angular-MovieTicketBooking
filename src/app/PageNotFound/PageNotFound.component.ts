import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-PageNotFound',
  templateUrl: './PageNotFound.component.html',
  styleUrls: ['./PageNotFound.component.css']
})
export class PageNotFoundComponent implements OnInit {
  
  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log("PageNotFound Component Initialized");
  }

}
