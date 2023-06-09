// src/app/services/error.service.ts
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private router: Router, private toastr: ToastrService) { }

  handleError(error: unknown, customErrorMessage?: string): string {
    console.error(error);

    let errorMessage = customErrorMessage || 'Ocorreu um erro desconhecido';

    const httpError = error as HttpErrorResponse;

    if (httpError.error?.message) {
      errorMessage = httpError.error.message;
    } else if (httpError.message) {
      errorMessage = httpError.message;
    }

    this.toastr.error(errorMessage);

    if (errorMessage === 'Não foi possível autenticar o usuário') {
      this.router.navigate(['/login']);
    }

    return errorMessage;
  }
}