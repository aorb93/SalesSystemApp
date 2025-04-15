import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../models/color';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiColorService {
  url: string = 'http://192.168.0.172/Color';

  constructor(
    private _http: HttpClient
  ) { }

  getColors(companyId: number): Observable<Color[]>{
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<Color[]>(`${this.url}${_companyId}${companyId}`);
  }

  postColor(color: Color): Observable<Color[]>{ 
    return this._http.post<Color[]>(this.url + '/InsColor', color, httpOption);
  }

  putColor(color: Color): Observable<Color[]>{ 
    return this._http.put<Color[]>(this.url + '/UpdColor', color, httpOption);
  }

  delColor(color: Color): Observable<Color[]>{
    return this._http.put<Color[]>(this.url + '/DelColor', color, httpOption);
  }
}
