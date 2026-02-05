import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { subCategory, SubCategory } from '../models/subCategory';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiSubCategoryService {
  url: string = environment.apiUrl + 'SubCategory';

  constructor(
    private _http: HttpClient
  ) { }

  getSubCategories(categoryId: number, genderId: number, companyId: number): Observable<SubCategory[]>{
    const _categoryId: string = '/List?CategoryId=';
    const _genderId: string = '&GenderId=';
    const _companyId: string = '&CompanyId=';
    return this._http.get<SubCategory[]>(`${this.url}${_categoryId}${categoryId}${_genderId}${genderId}${_companyId}${companyId}`);
  }

  getSubCategory(categoryId: number, companyId: number): Observable<SubCategory[]>{
    const _categoryId: string = '/ListSubCategory?CategoryId=';
    const _companyId: string = '&CompanyId=';
    return this._http.get<SubCategory[]>(`${this.url}${_categoryId}${categoryId}${_companyId}${companyId}`);
  }

  postSubCategory(subCategory: subCategory): Observable<subCategory[]>{ 
      return this._http.post<subCategory[]>(this.url + '/InsSubCategory', subCategory, httpOption);
    }

  putSubCategory(subCategory: subCategory): Observable<subCategory[]>{ 
    return this._http.put<subCategory[]>(this.url + '/UpdSubCategory', subCategory, httpOption);
  }

  delSubCategory(subCategory: subCategory): Observable<subCategory[]>{
    return this._http.put<subCategory[]>(this.url + '/DelSubCategory', subCategory, httpOption);
  }
}
