export class InputInfo {
  public url: string;
  public codeSnippet: string;
  public testName: string;
  public testDescription: string;
  public _id: number;
  public testType: string;
  public testQueryParam: string;
  public testCookie: string;

  constructor() { 
    this.url = '';
    this.codeSnippet = '';
    this.testName = '';
    this.testDescription = '';
    this.testQueryParam = '';
    this.testCookie = '';
  }

}
