import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./../protected.component.css']
})
export class DashboardComponent implements OnInit{

  constructor( ) { }

  ngOnInit(): void {
    if(localStorage.getItem('reservas')!==null){
      localStorage.removeItem('reservas');
    }
  }
}
