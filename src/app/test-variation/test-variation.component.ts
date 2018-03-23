import { Component, OnInit, HostListener, Renderer2, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadUrlService } from '../services/load-url.service';

@Component({
  selector: 'app-test-variation',
  templateUrl: './test-variation.component.html',
  styleUrls: ['./test-variation.component.css']
})
export class TestVariationComponent implements OnInit {
  inputInfo: InputInfo;
  // Need to figure out a Type for iframeElem
  iframeElem: any;
  safeUrl: SafeResourceUrl;

  @Output() previewMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() readyToActivate: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Input() enableIframe: boolean;
  
  constructor(private sanitizer: DomSanitizer,
    private el: ElementRef,
    private loadUrlService: LoadUrlService
  ) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => {
      // console.log(res);
      this.inputInfo = res;
    });
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
    // Need to trigger this when Create button from custom code box is clicked
  }

  @HostListener('onload') onLoad() {
    this.iframeElem = this.el.nativeElement.querySelector('iframe');
    if (this.iframeElem.contentDocument.body.firstElementChild) {
      // Need to add code to add Script Tag only when iframe has finished loading
      // console.log(this.iframeElem.contentDocument.firstElementChild.firstElementChild);
      let iframeScript = this.iframeElem.contentDocument.createElement('script');
      iframeScript.setAttribute("type", "text/javascript");
      iframeScript.setAttribute("id", "fromABTesting");
      iframeScript.innerText = this.inputInfo.codeSnippet;
      this.iframeElem.contentDocument.body.appendChild(iframeScript);
    }

    this.previewMode.emit(true);
    this.readyToActivate.emit(true);
  }

}
