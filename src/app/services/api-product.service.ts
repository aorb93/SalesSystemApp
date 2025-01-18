import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { Product } from '../models/product';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  url: string = 'http://192.168.0.172/Product';

  constructor(
    private _http: HttpClient
  ) { }

  getProducts(companyId: number): Observable<Response[]>{
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<Response[]>(`${this.url}${_companyId}${companyId}`);
  }

  getProduct(companyId: number, productId: number): Observable<Product[]>{
    const _companyId: string = '/ListProduct?CompanyId=';
    const _productId: string = '&ProductId=';
    return this._http.get<Product[]>(`${this.url}${_companyId}${companyId}${_productId}${productId}`);
  }
}
