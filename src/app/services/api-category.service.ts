import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getCategories(companyId: number): Observable<Category[]>{
    const _companyId: string = '/CategoryList?CompanyId=';
    return this._http.get<Category[]>(`${this.url}${_companyId}${companyId}`);
  }

  postCategories(category: Category): Observable<Category[]>{
    return this._http.post<Category[]>(this.url + '/Register', category, httpOption);
  }

  editCategories(category: Category): Observable<Category[]>{
    return this._http.put<Category[]>(this.url + '/Edit', category, httpOption);
  }

  deleteCategories(categoryId: number): Observable<Category[]>{
    return this._http.delete<Category[]>(`${this.url + '/Delete'}/${categoryId}`);
  }

  // Dialog Product
  getSelectCategory(companyId: number): Observable<Category[]>{
    const _companyId: string = '/CategoryList?CompanyId=';
    return this._http.get<Category[]>(`${this.url}${_companyId}${companyId}`);
  }
}