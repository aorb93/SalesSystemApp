import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { apiAuthService } from "../services/apiAuth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{

    constructor(private router: Router, private apiAuthService: apiAuthService){
        
    }

    canActivate(route: ActivatedRouteSnapshot){
        const user = this.apiAuthService.userData;

        if(this.apiAuthService.isAuth()){
            return true;
        }
        
        this.apiAuthService.logout();
        this.router.navigate(['/login']);
        return false;
    }
}