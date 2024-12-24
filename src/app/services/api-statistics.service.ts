import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BestProduct } from '../models/statistics';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiStatisticsService {

  url: string = 'http://192.168.100.57/Home/';
  
  constructor(
    private _http: HttpClient
  ) { }

  getBestProduc(companyId: number): Observable<BestProduct[]>{
    const _companyId: string = 'BestProducList?CompanyId=';
    return this._http.get<BestProduct[]>(`${this.url}${_companyId}${companyId}`);
  }
}
