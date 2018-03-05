import { Injectable } from '@angular/core';
import { InputInfo } from '../models/input-info';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoadUrlService {
  constructor(private http: HttpClient) { }
}
