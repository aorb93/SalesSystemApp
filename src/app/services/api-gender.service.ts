import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../models/gender';

@Injectable({
  providedIn: 'root'
})
export class ApiGenderService {
  url: string = 'http://192.168.0.172/Gender/List';

  constructor(
    private _http: HttpClient
  ) { }

  getGender(){
    return this._http.get<Gender[]>(this.url);
  }
}
