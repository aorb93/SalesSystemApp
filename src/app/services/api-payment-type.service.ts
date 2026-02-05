import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentType, PaymentTypeUser } from '../models/paymentType';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiPaymentTypeService {
  url: string = environment.apiUrl + 'PaymentType';

  constructor(
    private _http: HttpClient
  ) { }

  getPaymentTypeUser(companyId: number, clientId: number): Observable<PaymentTypeUser[]>{
    const _companyId: string = '/ListPaymentTypeUser?CompanyId=';
    const _clientId: string = '&ClientId=';
    return this._http.get<PaymentTypeUser[]>(`${this.url}${_companyId}${companyId}${_clientId}${clientId}`);
  }

  getPaymentTypes(companyId: number): Observable<PaymentType[]>{
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<PaymentType[]>(`${this.url}${_companyId}${companyId}`);
  }

  postPaymentType(paymentType: PaymentType): Observable<PaymentType[]>{ 
    return this._http.post<PaymentType[]>(this.url + '/InsPaymentType', paymentType, httpOption);
  }

  putPaymentType(paymentType: PaymentType): Observable<PaymentType[]>{ 
    return this._http.put<PaymentType[]>(this.url + '/UpdPaymentType', paymentType, httpOption);
  }

  delPaymentType(paymentType: PaymentType): Observable<PaymentType[]>{
    return this._http.put<PaymentType[]>(this.url + '/DelPaymentType', paymentType, httpOption);
  }
}
