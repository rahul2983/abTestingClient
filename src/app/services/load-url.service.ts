import { Injectable } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadUrlService {
  defaultInfo = new InputInfo();
  private inputInfo = new BehaviorSubject<InputInfo>(this.defaultInfo);
  currentInputInfo = this.inputInfo.asObservable();

  constructor(private http: HttpClient) { }

  setAbTestCreated(inputInfo: InputInfo) {
    this.inputInfo.next(inputInfo);
  }

  addAbTest(inputInfo: InputInfo) {
    return this.http.post('/api/abtest/create', {
      url: inputInfo.url,
      codeSnippet: inputInfo.codeSnippet,
      testName: inputInfo.testName,
      testDescription: inputInfo.testDescription,
      testStatus: inputInfo.testStatus
    });
  }

  // maybe change this to a GET request
  getAllAbTests() {
    return this.http.post('/api/abtest/getAllAbTests', {});
  }

  updateAbTest(inputInfo: InputInfo) {
    return this.http.post('/api/abtest/updateAbTest', {
      id: inputInfo._id,
      codeSnippet: inputInfo.codeSnippet,
      testStatus: inputInfo.testStatus
    });
  }

  saveAbTest(inputInfo: InputInfo) {
    return this.http.post('/api/abtest/saveAbTest', {
      id: inputInfo._id,
      testQueryParam: inputInfo.testQueryParam,
      testCookie: inputInfo.testCookie,
      testStatus: inputInfo.testStatus
    });
  }

  saveAudienceInfo(inputInfo: InputInfo) {
    return this.http.post('/api/abtest/saveAudienceInfo', {
      id: inputInfo._id,
      testStatus: inputInfo.testStatus,
      testTraffic: inputInfo.testTraffic,
      deviceType: inputInfo.deviceType
    });
  }

  deleteAbTest(inputInfo: InputInfo) {
    return this.http.post('/api/abtest/deleteAbTest', {
      id: inputInfo._id      
    })
  }

  getDOMUrl(url: string) {
    return this.http.get(url, {
      responseType: 'text',
    });
  }
}
