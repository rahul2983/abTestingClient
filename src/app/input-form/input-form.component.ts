import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { LoadUrlService } from '../services/load-url.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  @ViewChild("pageDOM", {read: ElementRef}) pageDOM: ElementRef;
  @ViewChild("testURLVal", {read: ElementRef}) testURLVal: ElementRef;
  inputInfo = new InputInfo('http://www.espncricinfo.com/');
  submitted = false;
  loaded = false;
  safeURL: SafeResourceUrl;

  constructor(private loadUrlService: LoadUrlService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
  }

  getDomInfo() {
    if (this.pageDOM.nativeElement) {
      console.log(this.pageDOM.nativeElement);
    // console.log(this.pageDOM.nativeElement);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loadUrlService.loadUrl(this.inputInfo);
  }

  get diagnostic() {
    return JSON.stringify(this.inputInfo);
  }

  onLoad() {
    this.loaded = true;
    this.getDomInfo();
  }
  
}
