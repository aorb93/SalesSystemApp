import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  url: string = 'http://192.168.100.69/Client';

  constructor(
    private _http: HttpClient
  ) { }

  getClients(companyId: number): Observable<Client[]>{
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<Client[]>(`${this.url}${_companyId}${companyId}`);
  }

}
