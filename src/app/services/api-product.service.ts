import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { Product, insProduct } from '../models/product';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  url: string = environment.apiUrl + 'Product';

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

  postProduct(product: insProduct): Observable<insProduct[]>{
    return this._http.post<insProduct[]>(this.url + '/InsProduct', product, httpOption);
  }

  putProduct(product: insProduct): Observable<insProduct[]>{
    return this._http.put<insProduct[]>(this.url + '/UpdProduct', product, httpOption);
  }

  deleteProduct(productId: number): Observable<Response[]>{
    const _productId: string = '/DelProduct?ProductId=';
    return this._http.delete<Response[]>(`${this.url}${_productId}${productId}`);
  }
}
