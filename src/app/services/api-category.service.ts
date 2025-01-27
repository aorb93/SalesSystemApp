import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { Category } from '../models/category';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {
  url: string = 'http://192.168.0.172/Category';

  constructor(
    private _http: HttpClient
  ) { }

  getCategories(): Observable<Response[]>{
    return this._http.get<Response[]>(this.url);
  }

  postCategories(category: Category): Observable<Response[]>{
    return this._http.post<Response[]>(this.url, category, httpOption);
  }

  editCategories(category: Category): Observable<Response[]>{
    return this._http.put<Response[]>(this.url, category, httpOption);
  }

  deleteCategories(categoryId: number): Observable<Response[]>{
    return this._http.delete<Response[]>(`${this.url}/${categoryId}`);
  }

  // Dialog Product
  getSelectCategory(): Observable<Response[]>{
    return this._http.get<Response[]>(this.url);
  }
}