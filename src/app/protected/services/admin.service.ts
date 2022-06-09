import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { FindUserResponse, User } from '../interfaces/interfaces';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURL: string = environment.baseURL;

  arrUsuarios: User[] = [];

  constructor(private http: HttpClient, private router: Router) { }


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
}
