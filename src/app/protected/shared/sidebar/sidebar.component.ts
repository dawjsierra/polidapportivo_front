import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  //  inyeccion del servicio
  constructor(private router: Router) { }

  //   getter del rol
    get role(): number{
      let rol = Number(localStorage.getItem('role'));
      return rol;
    }

  //  funcion logout, boora toda la local y te redirige a /auth
  logout(){
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('surname');
    localStorage.removeItem('role');
    localStorage.removeItem('reservas');
    localStorage.removeItem('checkBookings');
    this.router.navigateByUrl('/auth');
  }

}
