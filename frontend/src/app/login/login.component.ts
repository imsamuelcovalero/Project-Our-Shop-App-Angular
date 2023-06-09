import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LocalStorageHelper } from '../helpers/localStorage.helper';
import { LoginValidator } from '../validators/login.validator';
import { ErrorService } from '../services/error.service';

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
    private errorService: ErrorService
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
      this.apiService.post('/login', this.loginForm.value).subscribe(
        data => {
          LocalStorageHelper.saveUserInfo({
            token: data.token,
            id: data.id,
            email: data.email,
            username: data.username,
            role: data.role
          });
          this.router.navigate(['/home']);
        },
        error => {
          this.errorMessage = this.errorService.handleError(error, 'Falha no login.');
        }
      );
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}