import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BookingService } from '../services/booking.service';
import { Booking } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[BookingService]
})
export class UserComponent implements OnInit {

  arrReservas: Booking[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    console.log("hola en el oninit");
    this.bookingService.bookingsUsers().subscribe(reservas=>this.arrReservas=reservas);
  }

  get name(){
    return localStorage.getItem('name');
  }

  get surname(){
    return localStorage.getItem('surname');
  }

  get email(){
    return localStorage.getItem('email');
  }

}
