import { Component, OnInit } from '@angular/core';
import { LoadUrlService } from '../services/load-url.service';
import { InputInfo } from '../models/input-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-froala-wusiwyg',
  templateUrl: './froala-wusiwyg.component.html',
  styleUrls: ['./froala-wusiwyg.component.css']
})
export class FroalaWusiwygComponent implements OnInit {
  inputInfo: InputInfo;
  domContent: string;
  readyToActivate: boolean;

  constructor(private loadUrlService: LoadUrlService, private router: Router) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => {
      this.inputInfo = res;
      console.log(this.inputInfo);
      this.loadUrlService.getDOMUrl(this.inputInfo.url).subscribe(data => {
        console.log(data);
        this.domContent = data;
        this.setHtml(data);
      });
    });
  }

  setHtml(html) {
    $(document).ready(
      (<any>$("#froala-editor")).froalaEditor('html.set', html)
    );
  }

  getHtml() {
    this.inputInfo.modifiedDom = (<any>$("#froala-editor")).froalaEditor('html.get', true);
    console.log(this.inputInfo.modifiedDom);
    this.updateAbTest();
    this.readyToActivate = true;
  }

  onNextClick() {
    this.router.navigateByUrl('activate');
  }

  updateAbTest() {
    console.log('next two consoles inside updateAbTest');
    console.log(this.inputInfo._id);
    console.log(this.inputInfo.modifiedDom);
    if (this.inputInfo.modifiedDom) {
      if (this.inputInfo._id) {
        this.loadUrlService.updateAbTest(this.inputInfo).subscribe(res => {
          console.log('AbTest updated in the DB with modified DOM');
        });
      }
    }
  }

}
