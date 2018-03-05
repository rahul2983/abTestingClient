import { Component, OnInit, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { LoadUrlService } from '../services/load-url.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  inputInfo = new InputInfo('http://localhost:4200/testPage.html', 'console.log("Hello World");');
  submitted = false;
  codeAdded = false;
  enableIframe = false;
  safeURL: SafeResourceUrl;

  constructor(private loadUrlService: LoadUrlService, private sanitizer: DomSanitizer, private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
  }

  ngAfterViewInit() {
    // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
  }

  onSubmit() {
    this.submitted = true;
    this.codeAdded = true;
    this.enableIframe = this.submitted && this.codeAdded;
    this.loadUrlService.loadUrl(this.inputInfo);
  }

  get diagnostic() {
    return JSON.stringify(this.inputInfo);
  }

  @HostListener('onload') onLoad() {
    this.el.nativeElement.querySelectorAll('iframe').forEach(element => {
      if (element.parentNode.id === 'variationIframe' && element.contentDocument.body.firstElementChild) {
        // console.log(element.parentNode.id);
        // console.log(element.contentDocument.body.firstElementChild);
        let iframeScript = element.contentDocument.createElement('script');
        iframeScript.innerText = this.inputInfo.codeSnippet;
        element.contentDocument.body.appendChild(iframeScript);
      }
    });
    
  }

  over() {
    this.el.nativeElement.querySelectorAll('iframe').forEach(element => {
      if (element.parentNode.id === 'userFriendlyIframe' && element.contentDocument.body.firstElementChild) {
        console.log('Mouse Hover');
        element.contentDocument.querySelectorAll('div').forEach( divElem => {
          console.log(divElem);
          this.renderer.listen(divElem, 'mouseover',  (event) => {
            event.target.setAttribute('style', 'border-style: dotted;');
          });
          this.renderer.listen(divElem, 'mouseout', (event) => {
            event.target.setAttribute('style', '');
          });
          this.renderer.listen(divElem, 'click', (event) => {
            console.log('pop an options box with selections');
          });
        });
      }
    });
  }
}

// document.querySelector('h1').innerText = 'Inside Aprajitas Version of the Page';
// console.log("Hello World");