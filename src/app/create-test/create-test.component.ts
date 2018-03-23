import { Component, OnInit, Input } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { LoadUrlService } from '../services/load-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  inputInfo: InputInfo;
  testTypes: Array<String>;
 
  constructor(private loadUrlService: LoadUrlService, private router: Router) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => this.inputInfo = res);
    this.testTypes = ['Custom Code', 'WYSIWYG'];
  }

  onSubmit() {
    this.createAbTest();
    // Set Up InputInfo for the first time to be able to subscribe to
    this.loadUrlService.setAbTestCreated(this.inputInfo);
    if (this.inputInfo.testType === 'Custom Code') {
      this.router.navigateByUrl('customCodeView');
    } else if (this.inputInfo.testType === 'WYSIWYG') {
      this.router.navigateByUrl('wysiwyg');
    }
  }

  createAbTest() {
    if (this.inputInfo.url && this.inputInfo.testName && this.inputInfo.testDescription) {
      // Set the intial status of the test to preview
      this.inputInfo.testStatus = 'preview';
      this.loadUrlService.createAbTest(this.inputInfo).subscribe(res => {
        console.log('AB Test Info created in the DB');
        this.inputInfo._id = res['data']._id;
        // console.log('New ID is ', this.inputInfo._id);
      });
    }
  }
}
