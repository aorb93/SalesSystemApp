import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season } from '../models/season';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiSeasonService {
  url: string = environment.apiUrl + 'Season';

  constructor(
    private _http: HttpClient
  ) { }

  getSeasons(companyId: number): Observable<Season[]>{
    const _companyId: string = '/List?CompanyId=';
    return this._http.get<Season[]>(`${this.url}${_companyId}${companyId}`);
  }

  postSeason(season: Season): Observable<Season[]>{ 
    return this._http.post<Season[]>(this.url + '/InsSeason', season, httpOption);
  }

  putSeason(season: Season): Observable<Season[]>{ 
    return this._http.put<Season[]>(this.url + '/UpdSeason', season, httpOption);
  }

  delSeason(season: Season): Observable<Season[]>{
    return this._http.put<Season[]>(this.url + '/DelSeason', season, httpOption);
  }
}
