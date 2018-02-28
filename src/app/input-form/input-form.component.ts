import { Component, OnInit } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { LoadUrlService } from '../services/load-url.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  inputInfo = new InputInfo('http://www.espncricinfo.com/');
  submitted = false;

  constructor(private loadUrlService: LoadUrlService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  setUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
  } 

  onSubmit() {
    this.submitted = true;
    this.loadUrlService.loadUrl(this.inputInfo);
    this.loadUrlService.loadDomInfo(this.inputInfo);
  }

  get diagnostic() {
    return JSON.stringify(this.inputInfo);
  }
}
