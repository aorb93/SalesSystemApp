import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CollectNextThreeDays, CollectWeek, OverduePayment } from '../models/collect';

@Injectable({
  providedIn: 'root'
})
export class ApiCollectsService {

  url: string = environment.apiUrl + 'Collect/';
  
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

    getOverduePayment(companyId: number): Observable<OverduePayment[]>{
      const _companyId: string = 'OverduePayment?CompanyId=' + companyId.toString();
      return this._http.get<OverduePayment[]>(`${this.url}${_companyId}`);
    }

}
