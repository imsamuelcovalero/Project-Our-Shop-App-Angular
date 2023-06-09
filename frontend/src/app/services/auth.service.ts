import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IAxiosError } from '../../interfaces/axios-error.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  async authenticateUser() {
    const userInfo = localStorage.getItem('userInfo');

    if (!userInfo) {
      throw new Error('Não foi possível autenticar o usuário');
    }

    const { token } = JSON.parse(userInfo);

    try {
      await this.api.get('/login/me', { headers: { Authorization: token } }).toPromise();
    } catch (error: unknown) {
      const axiosError = error as IAxiosError;
      let errorMsg = 'Não foi possível autenticar o usuário';
      if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
        errorMsg = axiosError.response.data.message;
      }
      throw new Error(errorMsg);
    }
  }
}