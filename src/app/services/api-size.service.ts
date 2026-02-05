import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Size } from '../models/size';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiSizeService {
  url: string = environment.apiUrl + 'Size';

  constructor(
    private _http: HttpClient
  ) { }

  getSizes(companyId: number): Observable<Size[]>{
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<Size[]>(`${this.url}${_companyId}${companyId}`);
  }

  postSize(size: Size): Observable<Size[]>{ 
    return this._http.post<Size[]>(this.url + '/InsSize', size, httpOption);
  }

  putSize(size: Size): Observable<Size[]>{ 
    return this._http.put<Size[]>(this.url + '/UpdSize', size, httpOption);
  }

  delSize(size: Size): Observable<Size[]>{
    return this._http.put<Size[]>(this.url + '/DelSize', size, httpOption);
  }
}
