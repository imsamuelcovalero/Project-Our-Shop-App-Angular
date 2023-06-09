// src/app/services/error.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAxiosError } from '../../interfaces/axios-error.interface';
import { ToastrService } from 'ngx-toastr'; // substituir pelo seu serviço de toasts

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private router: Router, private toastr: ToastrService) { }

  handleError(error: unknown, customErrorMessage?: string): string {
    console.error(error);

    const axiosError = error as IAxiosError;
    let errorMessage = customErrorMessage || 'Ocorreu um erro desconhecido';

    if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
      errorMessage = axiosError.response.data.message;
    } else if (axiosError.response) {
      errorMessage = axiosError.response.data?.message || axiosError.response.statusText || 'Ocorreu um erro desconhecido';
    } else if (axiosError.message) {
      errorMessage = axiosError.message;
    }

    this.toastr.error(errorMessage);

    if (errorMessage === 'Não foi possível autenticar o usuário') {
      this.router.navigate(['/login']);
    }

    return errorMessage;
  }
}