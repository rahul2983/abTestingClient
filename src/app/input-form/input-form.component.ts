import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { LoadUrlService } from '../services/load-url.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  inputInfo = new InputInfo('http://www.espncricinfo.com/');
  submitted = false;
  loaded = false;
  safeURL: SafeResourceUrl;

  constructor(private loadUrlService: LoadUrlService, private sanitizer: DomSanitizer, private el: ElementRef) { }

  ngOnInit() {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
  }

  ngAfterViewInit() {
    // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
  }

  onSubmit() {
    this.submitted = true;
    this.loadUrlService.loadUrl(this.inputInfo);
  }

  get diagnostic() {
    return JSON.stringify(this.inputInfo);
  }

  @HostListener('onload') onLoad() {
    let iframeElem = this.el.nativeElement.querySelector('iframe');
    console.log(iframeElem);
    console.log(iframeElem.querySelector('html'));
    
  }
}
