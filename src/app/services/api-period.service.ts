import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Period } from '../models/period';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiPeriodService {
  url: string = environment.apiUrl + 'Period';

  constructor(
    private _http: HttpClient
  ) { }

  getPeriod(companyId: number): Observable<Period[]>{
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<Period[]>(`${this.url}${_companyId}${companyId}`);
  }

  postPeriod(period: Period): Observable<Period[]>{ 
    return this._http.post<Period[]>(this.url + '/InsPeriod', period, httpOption);
  }

  putPeriod(period: Period): Observable<Period[]>{ 
    return this._http.put<Period[]>(this.url + '/UpdPeriod', period, httpOption);
  }

  delPeriod(period: Period): Observable<Period[]>{
    return this._http.put<Period[]>(this.url + '/DelPeriod', period, httpOption);
  }
}
