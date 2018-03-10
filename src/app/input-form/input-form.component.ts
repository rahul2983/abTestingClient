import { Component, OnInit, ElementRef, HostListener, Renderer2, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { LoadUrlService } from '../services/load-url.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ContextMenuComponent } from '../context-menu/context-menu.component';

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

  @ViewChild('iframe') iframe: ElementRef;
  compRef: ComponentRef<ContextMenuComponent>;

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  //activates the menu with the coordinates
  onrightClick(event){
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.contextmenu = true;
  }
  //disables the menu
  disableContextMenu(){
    this.contextmenu= false;
  }

  constructor(private loadUrlService: LoadUrlService,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2,
    private vcRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
    this.getAllAbTests();
  }

  onSubmit() {
    this.submitted = true;
    this.codeAdded = true;
    this.enableIframe = this.submitted && this.codeAdded;
    this.addAbTest();
  }

  addAbTest() {
    if (this.inputInfo.url && this.inputInfo.codeSnippet) {
      this.loadUrlService.addAbTest(this.inputInfo).subscribe(res => {
        console.log('AB Test Info saved in the DB');
      });
    }
  }

  getAllAbTests() {
    this.loadUrlService.getAllAbTests().subscribe(res => {
      console.log(res);
    });
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

    this.el.nativeElement.querySelectorAll('iframe').forEach(element => {
      if (element.parentNode.id === 'userFriendlyIframe' && element.contentDocument.body.firstElementChild) {
        const compFactory = this.resolver.resolveComponentFactory(ContextMenuComponent);
        this.compRef = this.vcRef.createComponent(compFactory);
        element.contentDocument.body.appendChild(this.compRef.location.nativeElement);
      }
    });
  }

  over() {
    this.el.nativeElement.querySelectorAll('iframe').forEach(element => {
      if (element.parentNode.id === 'userFriendlyIframe' && element.contentDocument.body.firstElementChild) {
        // console.log('Mouse Hover');
        element.contentDocument.querySelectorAll('div').forEach( divElem => {
          // console.log(divElem);
          const divStyle = divElem.getAttribute('style');
          // console.log(divStyle);
          this.renderer.listen(divElem, 'mouseover',  (event) => {
            if (divElem.getAttribute('class') !== "contextmenu") {
              event.target.setAttribute('style', 'border-style: dotted;');
            }
          });
          this.renderer.listen(divElem, 'mouseout', (event) => {
            if (divElem.getAttribute('class') !== "contextmenu") {
              event.target.setAttribute('style', '');
            }
          });
          this.renderer.listen(divElem, 'click', (event) => {
            // console.log('pop an options box with selections');
            this.contextmenuX = event.clientX;
            this.contextmenuY = event.clientY;
            this.contextmenu = true;
            console.log(event.clientX, event.clientY);
          });
        });
      }
    });
  }
}

// document.querySelector('h1').innerText = 'Inside Aprajitas Version of the Page';
// console.log("Hello World");