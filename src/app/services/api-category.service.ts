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
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<Category[]>(`${this.url}${_companyId}${companyId}`);
  }

  postCategories(category: Category): Observable<Category[]>{
    return this._http.post<Category[]>(this.url + '/InsCategory', category, httpOption);
  }

  editCategories(category: Category): Observable<Category[]>{
    return this._http.put<Category[]>(this.url + '/UpdCategory', category, httpOption);
  }

  deleteCategories(category: Category): Observable<Category[]>{
    return this._http.put<Category[]>(this.url + '/DelCategory', category, httpOption);
  }

  // Dialog Product
  getSelectCategory(companyId: number): Observable<Category[]>{
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<Category[]>(`${this.url}${_companyId}${companyId}`);
  }

  getCategory(categoryId: number, companyId: number): Observable<Category[]>{
    const _categoryId: string = '/ListCategory?CategoryId=';
    const _companyId: string = '&CompanyId=';
    return this._http.get<Category[]>(`${this.url}${_categoryId}${categoryId}${_companyId}${companyId}`);
  }
}