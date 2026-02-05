import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sales, SalesDetail, SalesDetailProducts, SalesDetailCredit } from '../models/sales';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiSalesService {
  url: string = environment.apiUrl + 'Sales/';

  constructor(
    private _http: HttpClient
  ) { }

  getSales(companyId: number): Observable<Sales[]>{
    const _companyId: string = 'SalesList?CompanyId=';
    return this._http.get<Sales[]>(`${this.url}${_companyId}${companyId}`);
  }

  getSalesDetail(companyId: number, saleId: number): Observable<SalesDetail[]>{
    const _companyId: string = 'SalesDetail?CompanyId=' + companyId.toString();
    const _saleId: string = '&SaleId=' + saleId.toString();
    return this._http.get<SalesDetail[]>(`${this.url}${_companyId}${_saleId}`);
  }

  getSalesDetailProducts(companyId: number, saleId: number): Observable<SalesDetailProducts[]>{
    const _companyId: string = 'SalesDetailProducts?CompanyId=' + companyId.toString();
    const _saleId: string = '&SaleId=' + saleId.toString();
    return this._http.get<SalesDetailProducts[]>(`${this.url}${_companyId}${_saleId}`);
  }

  getSalesDetailCredit(companyId: number, saleId: number): Observable<SalesDetailCredit[]>{
    const _companyId: string = 'SalesDetailCredit?CompanyId=' + companyId.toString();
    const _saleId: string = '&SaleId=' + saleId.toString();
    return this._http.get<SalesDetailCredit[]>(`${this.url}${_companyId}${_saleId}`);
  }
}
