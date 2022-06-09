import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/interfaces';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../protected.component.css'],
  providers:[AdminService]
})
export class AdminComponent implements OnInit {

  arrUsuarios: User[] = [];

  formEmail: FormGroup = new FormGroup({});
  formFecha: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {

    this.formEmail = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });

    this.formFecha = this.fb.group({
      fecha: ['', Validators.required]
    });
  }


  findUser(){
    const correo = this.formEmail.get('correo')!.value;

    this.adminService.findUser(correo).subscribe(usuarios => this.arrUsuarios=usuarios);

  }

  get usuarios(){

    return ;
  }

}
