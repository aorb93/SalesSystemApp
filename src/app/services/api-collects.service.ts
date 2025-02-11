import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CollectNextThreeDays, CollectWeek } from '../models/collect';

@Injectable({
  providedIn: 'root'
})
export class ApiCollectsService {

  url: string = 'http://192.168.0.172/Collect/';
  
    constructor(
      private _http: HttpClient
    ) { }
  
    getCollectWeek(companyId: number): Observable<CollectWeek[]>{
      const _companyId: string = 'CollectWeek?CompanyId=' + companyId.toString();
      return this._http.get<CollectWeek[]>(`${this.url}${_companyId}`);
    }

    getCollectNextThreeDays(companyId: number): Observable<CollectNextThreeDays[]>{
      const _companyId: string = 'CollectNextThreeDays?CompanyId=' + companyId.toString();
      return this._http.get<CollectNextThreeDays[]>(`${this.url}${_companyId}`);
    }
}
