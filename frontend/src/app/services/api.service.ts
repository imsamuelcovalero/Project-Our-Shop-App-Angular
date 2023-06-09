// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  get(url: string, options?: any): Observable<any> {
    return this.http.get(this.baseURL + url, options);
  }

  post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(this.baseURL + url, body, options);
  }
}