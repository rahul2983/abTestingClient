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
      console.log(res['data']);
    });
  }

  onclick() {
    this.clicked = true;
  }

  deleteAbTest() {
    // Being able to delete only the first row for now
    // Need to code for refreshing the homepage after deleting an entry - Maybe add a modal or force a hard refresh
    console.log(this.abTests[0]);
    this.loadUrlService.deleteAbTest(this.abTests[0]).subscribe(res => {
      console.log("Entry deleted in DB");
        
    });
  }

}
