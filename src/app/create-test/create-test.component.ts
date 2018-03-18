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
  submitted: boolean;
  inputInfo: InputInfo;
  testTypes: Array<String>;
  clicked: boolean = false;
 
  constructor(private loadUrlService: LoadUrlService, private router: Router) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => this.inputInfo = res);
    this.testTypes = ['Custom Code', 'Visual Editor', 'WYSIWYG'];
  }

  onSubmit() {
    this.submitted = true;
    this.addAbTest();
    this.loadUrlService.setAbTestCreated(this.inputInfo);
    if (this.inputInfo.testType === 'Custom Code') {
      this.router.navigateByUrl('customCodeView');
    } else if (this.inputInfo.testType === 'Visual Editor') {
      this.router.navigateByUrl('visualEditorView');
    } else if (this.inputInfo.testType === 'WYSIWYG') {
      this.router.navigateByUrl('wysiwyg');
    }
  }

  addAbTest() {
    if (this.inputInfo.url && this.inputInfo.testName && this.inputInfo.testDescription) {
      // Set the intial status of the test to preview
      this.inputInfo.testStatus = 'preview';
      this.loadUrlService.addAbTest(this.inputInfo).subscribe(res => {
        console.log('AB Test Info saved in the DB');
        this.inputInfo._id = res['data']._id;
        console.log('New ID is ', this.inputInfo._id);
      });
    }
  }

  onclick() {
    this.clicked = true;
  }
}
