import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from '../models/subCategory';

@Injectable({
  providedIn: 'root'
})
export class ApiSubCategoryService {
  url: string = 'http://192.168.0.172/SubCategory';

  constructor(
    private _http: HttpClient
  ) { }

  getSubCategories(categoryId: number, genderId: number): Observable<SubCategory[]>{
    const _categoryId: string = '/List?CategoryId=';
    const _genderId: string = '&GenderId=';
    return this._http.get<SubCategory[]>(`${this.url}${_categoryId}${categoryId}${_genderId}${genderId}`);
  }
}
