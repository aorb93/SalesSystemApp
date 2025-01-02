import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BestProduct, BestClient, SalesMonths } from '../models/statistics';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiStatisticsService {

  url: string = 'http://192.168.100.69/Home/';
  
  constructor(
    private _http: HttpClient
  ) { }

  getBestProduct(companyId: number): Observable<BestProduct[]>{
    const _companyId: string = 'BestProductList?CompanyId=';
    return this._http.get<BestProduct[]>(`${this.url}${_companyId}${companyId}`);
  }

  getBestClient(companyId: number): Observable<BestClient[]>{
    const _companyId: string = 'BestClientList?CompanyId=';
    return this._http.get<BestClient[]>(`${this.url}${_companyId}${companyId}`);
  }
  
  getSalesMonts(companyId: number): Observable<SalesMonths[]>{
    const _companyId: string = 'SalesMonthsList?CompanyId=';
    return this._http.get<SalesMonths[]>(`${this.url}${_companyId}${companyId}`);
  }
}
