// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';

interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | string[] };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = process.env['API_URL'] || 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(this.baseURL + url, options);
  }

  post<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(this.baseURL + url, body, options);
  }
}