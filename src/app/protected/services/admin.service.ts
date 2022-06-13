import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { FindUserResponse, User, DeleteUserResponse, FindBookingResponse } from '../interfaces/interfaces';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURL: string = environment.baseURL;

  arrUsuarios: User[] = [];

  constructor(private http: HttpClient, private router: Router) { }


  //  Buscar el usuario por correo
  findUser(correo: string){
    const url = `${this.baseURL}/finduser`;
    const body = {correo};
    const headers = new HttpHeaders({'Authorization':"mi-token-secreto"});

    return this.http.post<FindUserResponse>(url, body, {headers})
    .pipe(
      tap(resp => {
        return resp.usuarios;
      }),
      map(resp=>resp.usuarios),
      catchError(err => of(err.error.msg))
    )
  }

  //  Borrar al usuario encontrado
  deleteUser(id: number){
    const url = `${this.baseURL}/deleteusers/${id}`;
    const headers = new HttpHeaders({'Authorization':"mi-token-secreto"});

    return this.http.get<DeleteUserResponse>(url, {headers})
    .pipe(
      map(resp=>resp.status),
      catchError( err => of(err.error.msg))
    )
  }

  deleteBooking(id: number){
    const url = `${this.baseURL}/deletebookings/${id}`;
    const headers = new HttpHeaders({'Authorization':"mi-token-secreto"});

    return this.http.get<DeleteUserResponse>(url, {headers})
    .pipe(
      map(resp=>resp.status),
      catchError(err=>of(err.error.msg))
    )
  }

  findBooking(fecha: Date){
    const url = `${this.baseURL}/findbookings`;
    const body = {fecha};
    const headers = new HttpHeaders({'Authorization':"mi-token-secreto"});

    return this.http.post<FindBookingResponse>(url, body, {headers})
    .pipe(
      tap(resp =>{
        return resp.bookings;
      }),
      map(resp=>resp.bookings),
      catchError(err => of(err.error.msg))
    )
  }
}
