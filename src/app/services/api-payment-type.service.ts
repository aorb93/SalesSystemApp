import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentType } from '../models/paymentType';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiPaymentTypeService {
  url: string = 'http://192.168.0.172/PaymentType';

  constructor(
    private _http: HttpClient
  ) { }

  getPaymentTypes(): Observable<PaymentType[]>{
    const _metoth: string = '/List';
    return this._http.get<PaymentType[]>(`${this.url}${_metoth}`);
  }
}
