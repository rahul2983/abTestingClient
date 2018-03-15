import { Component, OnInit } from '@angular/core';
import { LoadUrlService } from '../services/load-url.service';
import { InputInfo } from '../models/input-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numAbTests: number;
  abTests: InputInfo;
  clicked: boolean = false;

  constructor(private loadUrlService: LoadUrlService) { }

  ngOnInit() {
    this.loadUrlService.getAllAbTests().subscribe(res => {
      this.numAbTests = Object.keys(res['data']).length;
      this.abTests = res['data'];
    });
  }

  onclick() {
    this.clicked = true;
  }

}
