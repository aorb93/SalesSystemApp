import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiAuthService } from "../services/apiAuth.service";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, switchMap, filter, take } from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    // Este semáforo evita que disparemos 10 peticiones de refresh si fallan 10 llamadas al mismo tiempo
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private apiAuthService: apiAuthService){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.apiAuthService.userData;

        // 1. Agregamos el token si existe (tu lógica actual)
        if (user && user.token) {
            request = this.addToken(request, user.token);
        }

        return next.handle(request).pipe(
            catchError(error => {
                // 2. Si el error es 401 (Vencido), intentamos renovar
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(request, next);
                }
                return throwError(() => error);
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            // Llamamos a tu nuevo método en el servicio
            return this.apiAuthService.refreshAccessToken().pipe(
                switchMap((res: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(res.token);
                    
                    // Reintentamos la petición original con el nuevo token
                    return next.handle(this.addToken(request, res.token));
                }),
                catchError((err) => {
                    this.isRefreshing = false;
                    this.apiAuthService.logout(); // Si falla el refresh, forzamos login
                    return throwError(() => err);
                })
            );
        } else {
            // Si ya hay un refresh en curso, esperamos a que termine para usar el nuevo token
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                })
            );
        }
    }
}