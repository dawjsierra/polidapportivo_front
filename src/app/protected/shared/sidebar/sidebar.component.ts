import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private bookingService : BookingService) { }

  ngOnInit(): void {
  }

  get role(): number{
    let rol = Number(localStorage.getItem('role'));
    return rol;
  }

  user(){
    this.router.navigateByUrl('/user');
  }

  reservas(){
    this.router.navigateByUrl('/reservas');
  }

  images(){
    this.router.navigateByUrl('/image');
  }

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
