import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Product } from '../type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient ) { }

  get<T>(url: string, options: Options): Observable<T>{
    return this.http.get<T>(url, options) as Observable<T>
  }

  add<T>(url: string, body: Product): Observable<T>{
    return this.http.post<T>(url, body) as Observable<T>
  }

  put<T>(url: string, body: Product): Observable<T>{
    return this.http.put<T>(url, body) as Observable<T>
  }

  delete<T>(url: string): Observable<T>{
    return this.http.delete<T>(url) as Observable<T>
  }

}

