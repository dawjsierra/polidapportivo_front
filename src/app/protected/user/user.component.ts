import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BookingService } from '../services/booking.service';
import { Booking } from '../interfaces/interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../protected.component.css'],
  providers:[BookingService]
})
export class UserComponent implements OnInit {

  arrReservas: Booking[] = [];
  arrReservas2: Booking[] = this.arrReservas.splice(this.arrReservas.length-5);

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
