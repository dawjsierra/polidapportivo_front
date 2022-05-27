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

  //  Hay que importar el ReactiveFormsModule en el auth.module.ts, dentro ponemos los campos que va a tener el formulario
  miFormulario: FormGroup = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(4)]]

    //  sintaxis--> campo: [valorXDefecto, [validador1, validador2]];
  });


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
  //  trabajando con FormBuilder hace que los formularios sean mas sencillos

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
