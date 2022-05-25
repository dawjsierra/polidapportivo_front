import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from '../../auth/interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit{

  constructor( private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
    if(localStorage.getItem('reservas')!==null){
      localStorage.removeItem('reservas');
    }
  }
}
