import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  //  inyectamos servicios y clases en el constructor
  constructor(private router: Router){}

  //  GUARD DE ADMIN --> COMPROBAMOS SI EL USUARIO LOGEADO ES ADMIN O NO
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //  cogemos el atributo rol de la localstorage
      let rol = Number(localStorage.getItem('role'));

      //  si el rol es uno devuelve true
      if(rol === 1){
        return true;
      }else{
        this.router.navigateByUrl('/dashboard');
        return false;
      }
  }

}
