import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../../../core/services/auth.service';



@Component({
  selector: 'app-login',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.html',

  styleUrl: './login.scss'
})
export class Login {



  private readonly formBuilder = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);



  isLoading = false;

  errorMessage = '';

  formValidated = false;

  showPassword = false;




  readonly loginForm = this.formBuilder.nonNullable.group({


    email: [

      '',

      [
        Validators.required,
        Validators.email
      ]

    ],



    password: [

      '',

      [
        Validators.required,
        Validators.minLength(6)
      ]

    ]


  });





  get email() {

    return this.loginForm.controls.email;

  }





  get password() {

    return this.loginForm.controls.password;

  }





  togglePasswordVisibility(): void {

    this.showPassword =
      !this.showPassword;

  }







  onSubmit(): void {


    this.errorMessage = '';

    this.formValidated = false;



    if (this.loginForm.invalid) {


      this.loginForm.markAllAsTouched();


      return;


    }


    this.isLoading = true;



    try {


const redirectUrl =
  this.authService.login(
    this.email.value
  );





      this.formValidated = true;

      this.isLoading = false;



      this.router.navigate([

        redirectUrl

      ]);





    } catch {


      this.isLoading = false;

      this.errorMessage =

        'Invalid email account';



    }



  }



}