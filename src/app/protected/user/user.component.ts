import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BookingService } from '../services/booking.service';
import { Booking } from '../interfaces/interfaces';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../protected.component.css'],
  providers:[BookingService]
})
export class UserComponent implements OnInit {

  arrReservas: Booking[] = [];

  formUpdate: FormGroup = new FormGroup({});

  constructor(private bookingService: BookingService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookingService.bookingsUsers().subscribe(reservas=>this.arrReservas=reservas);

    this.formUpdate = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  updateUser(){
    let email: string = this.formUpdate.get('email')!.value;
    let name: string = this.formUpdate.get('name')!.value;
    let surname: string = this.formUpdate.get('surname')!.value;
    let password: string = this.formUpdate.get('password')!.value;
    let role: number = Number(localStorage.getItem('role'));
    let id: number = Number(localStorage.getItem('id'));


    //id: string, name: string, surname: string, email: string, password: string, role: number

    this.bookingService.updateUser(id, name, surname, email, password, role)
    .subscribe(resp=>{
      if(resp.id === id){
        Swal.fire('DATOS ACTUALIZADOS', 'VUELVE A INICIAR SESIÓN', 'success');
        this.logout();
      }else{
        Swal.fire('ERROR', 'ALGO SALIÓ MAL', 'error');
        this.router.navigateByUrl('/user');
      }
    })
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
