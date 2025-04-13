import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../models/gender';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

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

  postGender(gender: Gender): Observable<Gender[]>{
    return this._http.post<Gender[]>(this.url + 'InsGender', gender, httpOption);
  }

  deleteGender(gender: Gender): Observable<Gender[]>{
    return this._http.put<Gender[]>(this.url + 'DelGender', gender, httpOption);
  }

  editGender(gender: Gender): Observable<Gender[]>{
    return this._http.put<Gender[]>(this.url + 'UpdGender', gender, httpOption);
  }
}
