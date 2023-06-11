import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LocalStorageHelper } from '../helpers/localStorage.helper';
import { LoginValidator } from '../validators/login.validator';
import { ErrorService } from '../services/error.service';
import { ToastrService } from 'ngx-toastr';
// import { IUserResponse } from '../../interfaces/user-response.interface';

export interface IUserResponse {
  token: string;
  id: string;
  email: string;
  username: string;
  role: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      identifier: ['', LoginValidator.identifierRules()],
      password: ['', LoginValidator.passwordRules()]
    });
  }

  resetErrorMessage() {
    this.errorMessage = '';
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.apiService.post<IUserResponse>('/login', this.loginForm.value).subscribe({
        next: data => {
          LocalStorageHelper.saveUserInfo({
            token: data.token,
            id: data.id,
            email: data.email,
            username: data.username,
            role: data.role
          });
          this.toastr.success('Login bem-sucedido');
          setTimeout(() => this.router.navigate(['/home']), 1000);
        },
        error: error => {
          this.errorService.handleError(error, 'Falha no login. Tente novamente.');
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}