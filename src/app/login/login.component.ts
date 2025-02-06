import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from '../interfaces/Login';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: string = "";
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  })

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }
  get email() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }


  public async login() {

    if (this.loginForm.valid) {
      this.loginError = "";

      // console.log('this.loginForm.value ', this.loginForm.value);

      await lastValueFrom(this.loginService.login(this.loginForm.value as Login)).then(resp => {

        // console.log(resp);


        // console.info("Login Completo");
        this.router.navigateByUrl("/main/home")
        this.loginForm.reset();
      }).catch(errorData => {
        // console.error('errorData', errorData);
        this.loginError=errorData;

      });
    } else {
      this.loginForm.markAllAsTouched();
      Swal.fire({
        title: "Error",
        text: "Los datos ingresados no son correctos.",
        icon: "error"
      });
    }
  }

}
