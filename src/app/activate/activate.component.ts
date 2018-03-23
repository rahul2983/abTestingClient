import { Component, OnInit } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { LoadUrlService } from '../services/load-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  inputInfo: InputInfo;
  deviceTypes: Array<String>;

  constructor(private loadUrlService: LoadUrlService, private router: Router) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => {
      this.inputInfo = res;
    });
    this.deviceTypes = ['Desktop', 'Tablet', 'Mobile'];
  }

  onSubmit() {
    console.log("The test has been activated");

    // Set the test status to an appropriate value
    this.inputInfo.testStatus = 'active';

    this.loadUrlService.saveAudienceInfo(this.inputInfo).subscribe(res => {
      console.log('AB Test updated with audience conditions');
    });
    this.router.navigateByUrl('');
  }
}
