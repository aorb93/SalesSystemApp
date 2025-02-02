import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Period } from '../models/period';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiPeriodService {
  url: string = 'http://192.168.0.172/Period';

  constructor(
    private _http: HttpClient
  ) { }

  getPeriod(): Observable<Period[]>{
    const _list: string = '/List';
    return this._http.get<Period[]>(`${this.url}${_list}`);
  }
}
