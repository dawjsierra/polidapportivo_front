import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../../auth.component.css']
})
export class RegisterComponent {

  //  recogemos el elemento de email por referencia mediante @viewchild
  //  esto se llama binding de datos. Para pasar del componente hijo al padre
  @ViewChild('emailRef') emailRef!: ElementRef;

  //  formulario de register
    //  recoge el valor de todos los campos del formulario miFormulario del HTML
  miFormulario: FormGroup = this.fb.group({

    // los validadores son como reglas para que el formulario sea válido
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    role: [0,[]],
  })

  //  constructor de la clase inyectamos los servicios
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  //  metodo register
    //  para enviar la peticion al servidor de registrarse
  register(){
    console.log(this.miFormulario.value);
    const {email, password, name, surname, role} = this.miFormulario.value;

    //  PETICIÓN AL SERVIDOR
      //  llamamos al método register de authService importado en el constructor pasándole los parámetros requeridos
      //  el subscribe es un forma de decir "cuando recibamos respuesta..."
    this.auth.register(email, password, name, surname, role)
    .subscribe(ok =>{
      if(ok === email){
        Swal.fire('HECHO!', `${name} registrado correctamente`, 'success');
        this.router.navigateByUrl('/login');
      }else{  // si no
        this.emailRef.nativeElement.value='';
        Swal.fire('ERROR','Email ya registrado.', 'error');
      }
    })
  }

}
