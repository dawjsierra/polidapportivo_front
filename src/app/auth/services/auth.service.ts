import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { AuthResponse, Usuario, EmailsResponse, RegisterResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.baseURL;
  private _usuario!: Usuario;

  get usuario(){
    return { ...this._usuario };
    //lo ponemos desestructurado para evitar que alguna vez manipulemos el user
  }

  constructor(private http: HttpClient) { }

  register(email: string, password: string, name: string, surname: string, role: number){
    const url = `${ this.baseURL }/users`;
    const body = { email, password, name, surname, role };
    const headers = new HttpHeaders({'Authorization':"mi-token-secreto"});

    return this.http.post<RegisterResponse>(url, body, {headers})
    .pipe(
      map(resp => resp.email),
      catchError( err => of(err.error.msg))
    )

  }

  login(email: string, password: string){

    const url = `${ this.baseURL }/users/login`;
    const body = { email, password };
    const headers = new HttpHeaders({'Authorization':"mi-token-secreto"});

    return this.http.post<AuthResponse>(url, body, {headers}) //  aqui le indicamos que la peticion post será de tipo authResponse pasandole url, cuerpo, y cabecera (token)
    .pipe(
      tap(resp => { //ejecuta el código antes de que pase a los siguientes operadores
        if(resp){ //  en el login.component.ts indicamos el parametro de resp, en este caso resp.ok
          this._usuario = { email: resp.email, name: resp.name, surname: resp.surname, role: resp.role }
          localStorage.setItem('id', resp.id.toString());
          //  entonces, el objeto usuario se va a rellenar con estos valores de la respuesta
        }
      }),
      map(resp => resp),  // map muta la respuesta, en este caso devuelve el estado
      catchError( err => of(err.error.msg)) //  catchError para que cuando nos de error, nos devuelva un false. El of es un observable (importar)
    )
  }


  getData(){
    localStorage.setItem('name', this._usuario.name);
    localStorage.setItem('surname', this._usuario.surname);
    localStorage.setItem('role', this._usuario.role.toString());
    localStorage.setItem('email', this._usuario.email);
  }

  isLogged(): boolean{
    let res: boolean;
    if(localStorage.getItem('role') !== null){
      res = true;
    }else{
      res = false;
    }

    return res;
  }
}
