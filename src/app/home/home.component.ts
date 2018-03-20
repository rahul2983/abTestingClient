import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { LoadUrlService } from '../services/load-url.service';
import { InputInfo } from '../models/input-info';

import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('tableRow') tableRow: ElementRef;
  numAbTests: number;
  abTests: Array<InputInfo>;
  clicked: boolean = false;
  abtest_to_delete: InputInfo;

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
      this.numAbTests = res['data'].length;
      console.log(res['data']);
    }); 
  }

  deleteAbTest() {
    // Being able to delete only the first row for now
    // Need to code for refreshing the homepage after deleting an entry - Maybe add a modal or force a hard refresh
    console.log(this.tableRow.nativeElement.rowIndex);
    // console.log(this.abTests[index]);
    this.loadUrlService.deleteAbTest(this.abTests[0]).subscribe(res => {
      this.getAllAbTests();  
    });
  }

}
