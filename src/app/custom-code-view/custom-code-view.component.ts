import { Component, OnInit, Output, Input } from '@angular/core';
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
  safeURL: SafeResourceUrl;
  @Output() enableIframe: boolean;
  previewMode: boolean = false;
  readyToActivate: boolean = false;
  previewUrl: SafeResourceUrl;
  sanitizedPreviewUrl: string;

  originalRequested: boolean = true;
  variationRequested: boolean = false;

  constructor(
    private loadUrlService: LoadUrlService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUrlService.currentInputInfo.subscribe(res => {
      // console.log(res);
      this.inputInfo = res;
    });
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url);
  }

  onSubmit() {
    this.enableIframe = true;
    this.updateAbTest();
  }

  updateAbTest() {
    // console.log(this.inputInfo._id);
    // console.log(this.inputInfo.codeSnippet);
    if (this.inputInfo.codeSnippet && this.inputInfo._id) {
      this.loadUrlService.updateAbTest(this.inputInfo).subscribe(res => {
        console.log('AbTest updated in the DB with custom code');
      });
    }
  }

  onNotifyPreview(previewMode: boolean) {
    this.previewMode = previewMode;
  }

  onReadyToActivate(readyToActivate: boolean) {
    this.readyToActivate = readyToActivate;
  }

  onPreviewClick() {
    this.inputInfo.testQueryParam = "testPreviewID=" + this.inputInfo._id;
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputInfo.url + '?' + this.inputInfo.testQueryParam);
    this.sanitizedPreviewUrl = this.previewUrl['changingThisBreaksApplicationSecurity'];
  }

  onNextClick() {
    this.router.navigateByUrl('activate');
  }
  
  onOriginalSubmit() {
    this.originalRequested = true;
    this.variationRequested = false;
  }

  onVariationSubmit() {
    this.originalRequested = false;
    this.variationRequested = true;
  }
}