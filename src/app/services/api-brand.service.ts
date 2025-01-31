import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiBrandService {
  url: string = 'http://192.168.0.172/Brand';

  constructor(
    private _http: HttpClient
  ) { }

  getBrands(companyId: number): Observable<Brand[]>{
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<Brand[]>(`${this.url}${_companyId}${companyId}`);
  }
}
