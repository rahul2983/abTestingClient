import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { LoadUrlService } from '../services/load-url.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-code-view',
  templateUrl: './custom-code-view.component.html',
  styleUrls: ['./custom-code-view.component.css']
})
export class CustomCodeViewComponent implements OnInit {
  inputInfo: InputInfo;
  iframeElem: any;
  safeURL: SafeResourceUrl;
  enableIframe: boolean;

  constructor(
    private loadUrlService: LoadUrlService,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => {
      console.log('From Current Input Info');
      console.log(res);
      this.inputInfo = res;
    });
    console.log(this.inputInfo._id);
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
  }

  onSubmit() {
    this.enableIframe = true;
    this.updateAbTest();
  }

  updateAbTest() {
    console.log('next two consoles inside updateAbTest');
    console.log(this.inputInfo._id);
    console.log(this.inputInfo.codeSnippet);
    if (this.inputInfo.codeSnippet) {
      if (this.inputInfo._id) {
        this.loadUrlService.updateAbTest(this.inputInfo).subscribe(res => {
          console.log('AbTest updated in the DB');
        });
      }
    }
  }

  @HostListener('onload') onLoad() {
    this.iframeElem = this.el.nativeElement.querySelector('iframe');
    if (this.iframeElem.contentDocument.firstElementChild) {
      // Need to add code to add Script Tag only when iframe has finished loading
      console.log(this.iframeElem.contentDocument.firstElementChild.firstElementChild);
      let iframeScript = this.iframeElem.contentDocument.createElement('script');
      iframeScript.innerText = this.inputInfo.codeSnippet;
      this.iframeElem.contentDocument.body.appendChild(iframeScript);
    }
  }

}

// document.querySelector('h1').innerText = 'Inside Aprajitas Version of the Page';
// console.log("Hello World");