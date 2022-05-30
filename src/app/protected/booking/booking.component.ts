import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['../protected.component.css'],
})
export class BookingComponent implements OnInit {

  hours: string[] = [];

  formCalendario: FormGroup = new FormGroup({});
  formReserva: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router, private bookingService: BookingService) { }

  get fecha(){
    return this.formCalendario.get('fecha')!.value;
  }

  ngOnInit(): void {

    this.formCalendario = this.fb.group({
      fecha: ['', [Validators.required]]
    });

    this.formReserva = this.fb.group({
      horas: ['', [Validators.required]],
      sport: ['', [Validators.required]],
    });
    // this.formCalendario.get('fecha').value; // Obtencion
    // this.formCalendario.get('fecha').patchValue(''); //Establecer valor
  }

  checkHours(){
    let fecha:string = this.formCalendario.get('fecha')!.value;


    this.bookingService.checkHours(fecha)
    .subscribe(hours=>{
      this.hours.splice(0, this.hours.length);
      this.hours = hours;
    });
  }

  reservar(){
    let fecha:string = this.formCalendario.get('fecha')!.value;
    let hora: string = this.formReserva.get('horas')!.value;
    let sport: string = this.formReserva.get('sport')!.value;
    let user: number = Number(localStorage.getItem('id'));

    this.bookingService.reservar(fecha, hora, sport, user)
    .subscribe(resp=>{
      if(resp.sport === sport){
        Swal.fire('¡HECHO!', 'RESERVA REALIZADA CORRECTAMENTE', 'success');
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('ERROR', 'ALGO SALIÓ MAL', 'error');
        this.router.navigateByUrl('/reservas');
      }
    })
  }
}
