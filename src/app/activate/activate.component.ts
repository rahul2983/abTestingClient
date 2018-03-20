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
    // Add cookie to the URL
    this.inputInfo.testCookie = this.setCookie('testID', this.inputInfo._id, 5);
    // Add a Unique Identifier call every time you load the page
    console.log(this.inputInfo.testCookie);

    // Set the test status to an appropriate value
    this.inputInfo.testStatus = 'active';

    if (this.inputInfo.testCookie) {
      this.loadUrlService.saveAudienceInfo(this.inputInfo).subscribe(res => {
        console.log('AB Test updated with Cookie Value');
        console.log(this.inputInfo.testStatus);
        console.log(this.inputInfo.testTraffic);
        console.log(this.inputInfo.deviceType);
      });
    }
    this.router.navigateByUrl('home');
  }

  setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    return document.cookie;
  }
}

// document.querySelector('h1').innerText = 'Inside Aprajitas Version of the Page';
// console.log("Hello World");
