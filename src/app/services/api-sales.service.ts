import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sales } from '../models/sales';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiSalesService {
  url: string = 'http://192.168.0.172/Sales/';

  constructor(
    private _http: HttpClient
  ) { }

  getSales(companyId: number): Observable<Sales[]>{
    const _companyId: string = '?CompanyId=';
    return this._http.get<Sales[]>(`${this.url}${_companyId}${companyId}`);
  }
}
