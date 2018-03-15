import { Component, OnInit } from '@angular/core';
import { LoadUrlService } from '../services/load-url.service';
import { InputInfo } from '../models/input-info';

@Component({
  selector: 'app-froala-wusiwyg',
  templateUrl: './froala-wusiwyg.component.html',
  styleUrls: ['./froala-wusiwyg.component.css']
})
export class FroalaWusiwygComponent implements OnInit {
  inputInfo: InputInfo;
  domContent: string;

  constructor(private loadUrlService: LoadUrlService) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => {
      this.inputInfo = res;
      console.log(this.inputInfo);
      this.loadUrlService.getDOMUrl(this.inputInfo.url).subscribe(data => {
        console.log(data);
        this.domContent = data;
      });
    });
  }



}
