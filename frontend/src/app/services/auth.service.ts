// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IHttpError } from '../../interfaces/http-error.interface';
import { LocalStorageHelper } from '../helpers/localStorage.helper';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  authenticateUser(): Observable<void> {
    const { token } = LocalStorageHelper.getUserInfo();
    console.log('userInfo', token);

    if (!token) {
      return throwError(() => new Error('Não foi possível autenticar o usuário'));
    }

    return this.api.get('/login/me', { headers: { Authorization: token } }).pipe(
      catchError((error: IHttpError) => {
        let errorMsg = 'Não foi possível autenticar o usuário';
        if (error.response && error.response.data && error.response.data.message) {
          errorMsg = error.response.data.message;
        }
        return throwError(() => new Error(errorMsg));
      }),
      map(() => undefined) // Este operador 'map' é necessário para converter o resultado da chamada da API em um Observable<void>
    );
  }
}
