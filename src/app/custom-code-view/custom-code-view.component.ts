import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { LoadUrlService } from '../services/load-url.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  saved: boolean = false;
  previewMode: boolean = false;
  readyToActivate: boolean = false;
  previewUrl: SafeResourceUrl;
  sanitizedPreviewUrl: string;

  constructor(
    private loadUrlService: LoadUrlService,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => {
      console.log(res);
      this.inputInfo = res;
    });
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
  }

  onSubmit() {
    this.enableIframe = true;
    // this.updateAbTest();
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

  // Are we still using this next function?
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
    if (this.iframeElem.contentDocument.body.firstElementChild) {
      // Need to add code to add Script Tag only when iframe has finished loading
      console.log(this.iframeElem.contentDocument.firstElementChild.firstElementChild);
      let iframeScript = this.iframeElem.contentDocument.createElement('script');
      iframeScript.setAttribute("type", "text/javascript");
      iframeScript.setAttribute("id", "fromABTesting");
      iframeScript.innerText = this.inputInfo.codeSnippet;
      this.iframeElem.contentDocument.body.appendChild(iframeScript);
    }

    // this.saved = true;
    this.previewMode = true;
    this.readyToActivate = true;
  }

  // Mostly this logic goes to a new page where u activate a test based on audience and traffic
  save() {
    // Add a cookie to the test and store the same in the DB
    this.inputInfo.testCookie = this.setCookie('testID', this.inputInfo._id, 5);
    // Add Query Parameter with the DB _id
    this.inputInfo.testQueryParam = "q=" + this.inputInfo._id;
    // Add a Unique Identifier call every time you load the page
    console.log(this.inputInfo.testCookie);
    console.log(this.inputInfo.testQueryParam);

    // Set the test status to an appropriate value
    this.inputInfo.testStatus = 'active';

    if (this.inputInfo.testCookie && this.inputInfo.testQueryParam) {
      this.loadUrlService.saveAbTest(this.inputInfo).subscribe(res => {
        console.log('AB Test updated with Cookie and QueryParam Values');
      });
    }

    // this.previewMode = true;
  }

  onPreviewClick() {
    // Launch the URL version with QueryParams
    // Add Query Parameter with the DB _id
    this.inputInfo.testQueryParam = "testPreviewID=" + this.inputInfo._id;
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url + '?' + this.inputInfo.testQueryParam);
    this.sanitizedPreviewUrl = this.previewUrl['changingThisBreaksApplicationSecurity'];
  }

  onNextClick() {
    this.router.navigateByUrl('activate');
  }

  setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    return document.cookie;
  }
}

// document.querySelector('h1').innerText = 'Inside Aprajitas Version of the Page';
// console.log("Hello World");
// Similar logic as below to remove the code when re-visiting a saved test
// if (document.body.querySelector("#fromABTesting")) {
//   document.body.querySelector("#fromABTesting").remove();
// }