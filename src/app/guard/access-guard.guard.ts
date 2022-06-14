import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  //  GUARD DE ACCESO --> NOS INDICA SI EL USUARIO ESTÁ LOGEADO O NO
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //  si el metodo isLogged de authService devuelve true...
       if(this.authService.isLogged()){
         return true;
       }else{
         this.router.navigateByUrl('/auth/login');
         return false;
      }

      // return this.authService.isLogged().pipe
  }

}
