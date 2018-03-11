import { Component, OnInit, HostListener, ElementRef, Renderer2, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InputInfo } from '../models/input-info';
import { LoadUrlService } from '../services/load-url.service';

import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Component({
  selector: 'app-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements OnInit {
  inputInfo: InputInfo;
  safeURL: SafeResourceUrl;
  iframeElem: any;

  @ViewChild('iframe') iframe: ElementRef;
  compRef: ComponentRef<ContextMenuComponent>;

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  //activates the menu with the coordinates
  onrightClick(event){
    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.contextmenu = true;
  }

  //disables the menu
  disableContextMenu(){
    this.contextmenu= false;
  }

  constructor(
    private loadUrlService: LoadUrlService,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2,
    private vcRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => {
      console.log(res);
      this.inputInfo = res;
    });
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
  }

  @HostListener('onload') onLoad() {
    this.iframeElem = this.el.nativeElement.querySelector('iframe');
    if (this.iframeElem.contentDocument.body.firstElementChild) {
      const compFactory = this.resolver.resolveComponentFactory(ContextMenuComponent);
      this.compRef = this.vcRef.createComponent(compFactory);
      this.iframeElem.contentDocument.body.appendChild(this.compRef.location.nativeElement);
    }
  }

  over() {
    this.iframeElem = this.el.nativeElement.querySelector('iframe');
    if (this.iframeElem.contentDocument.body.firstElementChild) {
      this.iframeElem.contentDocument.querySelectorAll('div').forEach( divElem => {
        const divStyle = divElem.getAttribute('style');
        this.renderer.listen(divElem, 'mouseover',  (event) => {
          if (divElem.getAttribute('class') !== "contextmenu") {
            // console.log(event.target.getAttribute('style'));
            event.target.setAttribute('style', 'border-style: dotted;');
            this.renderer.listen(event.target, 'click', (event) => {
              this.contextmenuX = event.clientX;
              this.contextmenuY = event.clientY;
              this.contextmenu = true;
              // console.log(event.clientX, event.clientY);
            });
          }
        });
        this.renderer.listen(divElem, 'mouseout', (event) => {
          if (divElem.getAttribute('class') !== "contextmenu") {
            event.target.setAttribute('style', '');
          }
        });
        // this.renderer.listen(divElem, 'click', (event) => {
        //   this.contextmenuX = event.clientX;
        //   this.contextmenuY = event.clientY;
        //   this.contextmenu = true;
        //   console.log(event.clientX, event.clientY);
        // });
      });      
    }
  }
}
