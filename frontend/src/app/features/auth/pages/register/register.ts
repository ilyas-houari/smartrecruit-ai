import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';


const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
};


@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private readonly formBuilder = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  isLoading = false;
  errorMessage = '';
  formValidated = false;

  showPassword = false;
  showConfirmPassword = false;


  readonly registerForm = this.formBuilder.nonNullable.group(
    {
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(150)
        ]
      ],

      phone: [
        '',
        [
          Validators.maxLength(30),
          Validators.pattern(/^[0-9+\-() ]*$/)
        ]
      ],

      role: [
        'CANDIDATE',
        Validators.required
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ]
    },
    {
      validators: passwordsMatchValidator
    }
  );


  get firstName() {
    return this.registerForm.controls.firstName;
  }

  get lastName() {
    return this.registerForm.controls.lastName;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get phone() {
    return this.registerForm.controls.phone;
  }

  get role() {
    return this.registerForm.controls.role;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


  onSubmit(): void {

    this.errorMessage = '';
    this.formValidated = false;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, role } = this.registerForm.getRawValue();

    if (role !== 'CANDIDATE' && role !== 'RECRUITER') {
      this.errorMessage = 'Public registration cannot create ADMIN accounts.';
      return;
    }

    this.isLoading = true;

    // Temporary frontend-only mock.
    // Real POST /api/auth/register will be connected later.
    setTimeout(() => {
      this.isLoading = false;
      this.formValidated = true;

      const redirectUrl = this.authService.register(email, role);

      setTimeout(() => {
        this.router.navigate([redirectUrl]);
      }, 800);
    }, 500);
  }
}