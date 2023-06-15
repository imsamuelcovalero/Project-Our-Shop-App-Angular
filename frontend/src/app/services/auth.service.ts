// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IHttpError } from '../../interfaces/http-error.interface';
import { LocalStorageHelper } from '../helpers/localStorage.helper';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface IUserInfoForAuthService {
  username: string;
  cashbackValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private api: ApiService) {
    this.setInitialUser();
  }

  authenticateUser(): Observable<IUserInfoForAuthService> {
    const { token, username } = LocalStorageHelper.getUserInfo();

    if (!token) {
      return throwError(() => new Error('Não foi possível autenticar o usuário'));
    }

    return this.api.get<{ cashbackValue: number }>('/login/me', { headers: { Authorization: token } }).pipe(
      catchError((error: IHttpError) => {
        let errorMsg = 'Não foi possível autenticar o usuário';
        if (error.response && error.response.data && error.response.data.message) {
          errorMsg = error.response.data.message;
        }
        return throwError(() => new Error(errorMsg));
      }),
      map(result => {
        this.currentUser.next(username);
        return { username, cashbackValue: result.cashbackValue };
      })
    );
  }

  logout() {
    localStorage.removeItem('userOurShop');
    this.currentUser.next('');
  }

  private setInitialUser() {
    const { username } = LocalStorageHelper.getUserInfo();
    if (username) {
      this.currentUser.next(username);
    }
  }
}
