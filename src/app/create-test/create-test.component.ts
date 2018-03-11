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
 
  constructor(private loadUrlService: LoadUrlService, private router: Router) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => this.inputInfo = res);
  }

  onSubmit() {
    this.submitted = true;
    this.addAbTest();
    this.loadUrlService.setAbTestCreated(this.inputInfo);
    this.router.navigateByUrl('customCodeView');
  }

  addAbTest() {
    if (this.inputInfo.url && this.inputInfo.testName && this.inputInfo.testDescription) {
      this.loadUrlService.addAbTest(this.inputInfo).subscribe(res => {
        console.log('AB Test Info saved in the DB');
        this.inputInfo._id = res['data']._id;
      });
    }
  }
}
