import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../auth.component.css']
})
export class LoginComponent {

  //  Formulario reactivo que recoge los datos introducidos en los inputs del login
  miFormulario: FormGroup = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  });


  //inyectamos servicios en el constructor
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }


  //metodo login, manda peticion al servidor para logearnos
  login(){
    console.log(this.miFormulario.value);
    const {email, password} = this.miFormulario.value;

    this.authService.login(email, password).subscribe( resp => {  //  llama al metodo login de authservice y le pasa los parametros, el subscribe es la continuacion
      if(resp.ok === true){ //  si la respuesta es true
        this.router.navigateByUrl('/dashboard');  //  que nos lleve a esta pagina
        this.authService.getData();
      }else{
        Swal.fire('ERROR', resp , 'error') //  mensaje personalizado de error
      }
    })
    //
  }

}
