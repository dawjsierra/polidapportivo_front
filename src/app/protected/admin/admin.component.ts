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

  //  referencia al boton borrado
  @ViewChild('botonBorrado') botonBorrado!: ElementRef;

  //  array de usuarios
  arrUsuarios: User[] = [];

  //  array de reservas
  arrReservas: Booking[] = [];

  //  formularios de busqueda: el de usuarios (email) y el de fecha (reservas) inicializados vacios
  formEmail: FormGroup = new FormGroup({});
  formFecha: FormGroup = new FormGroup({});

  //  inyección de servicios
  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService) { }

  //  recogemos los valores de los formularios ahora en el ngOnInit para que recojan antes su valor, en cuanto cambie y no tengamos que recargar
    // ciclos de vida (ngOnInit)
  ngOnInit(): void {

    //  formulario de usuarios
    this.formEmail = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });

    //  formulario de reservas
    this.formFecha = this.fb.group({
      fecha: ['', Validators.required]
    });
  }

  //  deleteUser() --> método para borrar al usuario seleccionado
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

  //  findUser --> para encontrar al usuario que hemos escrito su correoo
  findUser(){
    const correo = this.formEmail.get('correo')!.value;
    this.adminService.findUser(correo).subscribe(usuarios => this.arrUsuarios=usuarios);
  }

  //  findBooking() --> para encontrar las reservas por la fecha seleccionada
  findBooking(){
    const fecha = this.formFecha.get('fecha')!.value;
    console.log(fecha)

    this.adminService.findBooking(fecha).subscribe(reservas=>this.arrReservas=reservas);
  }

  //  deleteBooking() --> método para borrar la reserva seleccionada
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
