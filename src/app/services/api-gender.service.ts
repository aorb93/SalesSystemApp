import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Gender } from '../models/gender';

@Injectable({
  providedIn: 'root'
})
export class ApiGenderService {
  url: string = 'http://192.168.0.172/Gender/';

  constructor(
    private _http: HttpClient
  ) { }

  getGender(companyId: number): Observable<Gender[]>{
    const _companyId: string = 'List?CompanyId=' + companyId.toString();
    return this._http.get<Gender[]>(`${this.url}${_companyId}`);
  }
}
