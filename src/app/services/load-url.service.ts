import { Injectable } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoadUrlService {
  iframeElem: any;
  constructor(private http: HttpClient) { }

  loadUrl(inputInfo: InputInfo) {
    console.log("The URL to be loaded: ", inputInfo);
  }
}
