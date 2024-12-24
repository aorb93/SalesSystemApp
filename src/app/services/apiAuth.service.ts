import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, retry } from "rxjs/operators";
import { Response } from "../models/response";
import { User } from "../models/user";
import { Login } from "../models/login";
import { Router } from "@angular/router";

const httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

@Injectable({
    providedIn: 'root'
})

export class apiAuthService {
    url: string = 'http://192.168.100.69/Access/Login';

    public userSubject!: BehaviorSubject<User>;
    public user!: Observable<User>;
    public get userData(): User{
        return this.userSubject.value;
    }

    constructor(private _http: HttpClient, private router: Router,){
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
        this.user = this.userSubject.asObservable();
    }

    login(login: Login): Observable<Response>{
        return this._http.post<Response>(this.url, login, httpOption).pipe(
            map(res => {
                if(res.result){
                    const user: User = res;
                    localStorage.setItem('User', JSON.stringify(user));
                    this.userSubject.next(user); 
                }
                return res;
            })
        );
    }

    logout(){
        localStorage.removeItem('User');
        this.userSubject.next(null!);
    }

    isAuth(): boolean {
        const info = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
        let token = '';

        if(info.value !== null)
            token = info.value.token;

        if(!token)
            return false;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        return Date.now() < exp;
    }
}