// src/app/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { RegisterValidator } from '../validators/register.validator';
import { ErrorService } from '../services/error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', RegisterValidator.nameRules()],
      username: ['', RegisterValidator.usernameRules()],
      email: ['', RegisterValidator.emailRules()],
      password: ['', RegisterValidator.passwordRules()],
    });
  }

  resetErrorMessage() {
    this.errorMessage = '';
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.apiService.post<{ message: string }>('/register', this.registerForm.value).subscribe({
        next: response => {
          this.toastr.success(response.message);
          this.successMessage = response.message;
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: error => {
          this.errorMessage = this.errorService.handleError(error, 'Erro ao registrar. Tente novamente.');
        }
      });
    }
  }
}