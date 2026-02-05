import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiSaleService {
  url: string = environment.apiUrl + 'Sale/';

  constructor(
    private _http: HttpClient
  ) { }

  postSale(sale: Sale): Observable<Sale[]>{
    return this._http.post<Sale[]>(this.url + 'Sale', sale, httpOption);
  }
}
