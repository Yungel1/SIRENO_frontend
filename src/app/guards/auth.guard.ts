import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private usuarioService: UsuarioService, private router: Router,private jwtHelper: JwtHelperService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = this.usuarioService.getToken()
        if (token) {
            if(this.jwtHelper.isTokenExpired(token)){
                alert("Su sesión ha expirado, inicie sesión de nuevo");
                this.usuarioService.deleteToken();
            } else{
                // logged in so return true
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
      
}