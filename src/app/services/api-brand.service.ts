import { environment } from '../../environments/environment';
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
  url: string = environment.apiUrl + 'Brand';

  constructor(
    private _http: HttpClient
  ) { }

  getBrands(companyId: number): Observable<Brand[]>{
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<Brand[]>(`${this.url}${_companyId}${companyId}`);
  }

  postBrand(brand: Brand): Observable<Brand[]>{ 
    return this._http.post<Brand[]>(this.url + '/InsBrand', brand, httpOption);
  }

  putBrand(brand: Brand): Observable<Brand[]>{ 
    return this._http.put<Brand[]>(this.url + '/UpdBrand', brand, httpOption);
  }

  delBrand(brand: Brand): Observable<Brand[]>{
    return this._http.put<Brand[]>(this.url + '/DelBrand', brand, httpOption);
  }
}
