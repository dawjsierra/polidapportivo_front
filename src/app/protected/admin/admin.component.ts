import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Booking, User } from '../interfaces/interfaces';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../protected.component.css'],
  providers:[AdminService]
})
export class AdminComponent implements OnInit {

  @ViewChild('botonBorrado') botonBorrado!: ElementRef;

  arrUsuarios: User[] = [];
  arrReservas: Booking[] = [];

  formEmail: FormGroup = new FormGroup({});
  formFecha: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {

    this.formEmail = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });

    this.formFecha = this.fb.group({
      fecha: ['', Validators.required]
    });
  }

  deleteUser(id:number){
    this.adminService.deleteUser(id)
    .subscribe(resp=>{
      if(resp === "OK"){
        Swal.fire('Usuario borrado correctamente', '', 'success' );
        this.router.navigateByUrl('/user');
      }else{
        Swal.fire('Algo salió mal', '', 'error' );
        this.router.navigateByUrl('/admin');
      }
    })
  }


  findUser(){
    const correo = this.formEmail.get('correo')!.value;
    this.adminService.findUser(correo).subscribe(usuarios => this.arrUsuarios=usuarios);
  }

  get usuarios(){
    return ;
  }


  findBooking(){
    const fecha = this.formFecha.get('fecha')!.value;
    console.log(fecha)

    this.adminService.findBooking(fecha).subscribe(reservas=>this.arrReservas=reservas);
  }

  deleteBooking(id: number){
    this.adminService.deleteBooking(id)
    .subscribe(resp=>{
      if(resp === "OK"){
        Swal.fire('Reserva borrada correctamente', '', 'success' );
        this.router.navigateByUrl('/user');
      }else{
        Swal.fire('Algo salió mal', '', 'error' );
        this.router.navigateByUrl('/admin');
      }
    })
  }
}
