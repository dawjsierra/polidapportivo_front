import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { BookingsUserResponse, Booking, DateAvailableResponse, CrearReservaResponse, ReservaInterface, UpdateUser } from '../interfaces/interfaces';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  //  url sacada de environments
  private baseURL: string = environment.baseURL;

  //  id del usuario logeado
  private id: number = Number(localStorage.getItem('id'));

  //  array de reservas
  public _reservas: Booking[] = [];

  //  getter de arrau de reservas desestructurado en el resultado
  get reservas(){
    return {... this._reservas};
  }

  //  inyección de servicios
  constructor(private http: HttpClient, private router: Router) { }

  //  Reservas del usuario logeado
    bookingsUsers(){
      const url = `${this.baseURL}/bookings/bookingsuser/${this.id}`;
      const headers = new HttpHeaders({'Authorization':"mi-token-secreto"});

      return this.http.get<BookingsUserResponse>(url, {headers})
      .pipe(
        tap(resp => {
          this.router.navigateByUrl('/user')
          return resp.bookings;
        }),
        map(resp=>resp.bookings),
        catchError(err => of(err.error.msg))
      )
    }



  //  Para comprobar las horas disponibles del dia seleccionado
    checkHours(fecha: string){

      const url = `${this.baseURL}/bookings/available/${fecha}`;
      const headers = new HttpHeaders({'Authorization':"mi-token-secreto"});

      return this.http.get<DateAvailableResponse>(url, {headers})
      .pipe(
        tap(resp=>{
          return resp.hours;
        }),
        map(resp=>resp.hours)
      )
    }

  //  llamada a la api para realizar una reserva con sus datos
    reservar(date: string, hour: string, sport: string, id_user: number){
      const url = `${this.baseURL}/bookings`;
      const body = { date, hour, sport, id_user };
      const headers = new HttpHeaders({'Authorization':"mi-token-secreto"});

      return this.http.post<CrearReservaResponse>(url, body, {headers});
    }


  //  llamada a la api para actualizar usuarios
    updateUser(id: number, name: string, surname: string, email: string, password: string, role: number ){
      const url = `${this.baseURL}/users/${id}`;
      const body = {id, name, surname, email, password, role};
      const headers = new HttpHeaders({'Authorization':"mi-token-secreto"});

      return this.http.put<UpdateUser>(url, body, {headers});
    }
}
