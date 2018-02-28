import { Injectable } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoadUrlService {

  constructor(private http: HttpClient) { }

  loadUrl(inputInfo: InputInfo) {
    console.log("The URL to be loaded: ", inputInfo);
  }

  loadDomInfo(inputInfo: InputInfo) {
    console.log('Capturing DOM info');
  }
}
