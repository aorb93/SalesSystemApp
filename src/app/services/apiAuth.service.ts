import { environment } from '../../environments/environment';
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
    url: string = environment.apiUrl + 'Access/Login';

    private expirationTimer: any;
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
                    const token = user.token;
                    localStorage.setItem('User', JSON.stringify(user));
                    localStorage.setItem('token', token);
                    this.userSubject.next(user); 

                    if (token) {
                        this.setupTokenTimer();
                    }
                }
                
                return res;
            })
        );
    }

    logout(){
        localStorage.removeItem('User');
        this.userSubject.next(null!);

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (this.expirationTimer) 
            clearTimeout(this.expirationTimer);
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

    setupTokenTimer() {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Decodificamos el payload del JWT
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Convertimos la expiración (exp) a milisegundos
        const expires = new Date(payload.exp * 1000);
        const timeout = expires.getTime() - Date.now();

        if (this.expirationTimer) 
            clearTimeout(this.expirationTimer);

        if (timeout <= 0) {
            this.logout();
        } else {
            this.expirationTimer = setTimeout(() => {
            this.logout();
            }, timeout);
        }
    }
}