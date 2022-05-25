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

  @ViewChild('emailRef') emailRef!: ElementRef;

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    role: [0,[]],
  })
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  register(){
    console.log(this.miFormulario.value);
    const {email, password, name, surname, role} = this.miFormulario.value;

    this.auth.register(email, password, name, surname, role)
    .subscribe(ok =>{
      if(ok === email){
        Swal.fire('HECHO!', `${name} registrado correctamente`, 'success');
        this.router.navigateByUrl('/login');
      }else{
        this.emailRef.nativeElement.value='';
        Swal.fire('ERROR','Email ya registrado.', 'error');
      }
    })
  }

}
