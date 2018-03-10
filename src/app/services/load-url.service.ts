import { Injectable } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoadUrlService {
  constructor(private http: HttpClient) { }

  addAbTest(inputInfo: InputInfo) {
    return this.http.post('/api/abtest/create', {
      url: inputInfo.url,
      codeSnippet: inputInfo.codeSnippet
    });
  }

  getAllAbTests() {
    return this.http.post('/api/abtest/getAllAbTests', {});
  }
}
