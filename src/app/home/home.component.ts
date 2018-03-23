import { Component, OnInit } from '@angular/core';
import { LoadUrlService } from '../services/load-url.service';
import { InputInfo } from '../models/input-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  abTests: Array<InputInfo>;
  clicked: boolean = false;

  constructor(private loadUrlService: LoadUrlService) { }

  ngOnInit() {
    this.getAllAbTests();
  }

  onclick() {
    this.clicked = true;
  }

  getAllAbTests() {
    this.loadUrlService.getAllAbTests().subscribe(res => {
      this.abTests = res['data'];
    }); 
  }

  deleteAbTest(rowIndex: number) {
    this.loadUrlService.deleteAbTest(this.abTests[rowIndex]).subscribe(res => {
      this.getAllAbTests();  
    });
  }

}
