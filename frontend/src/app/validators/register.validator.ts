// src/app/validators/register.validator.ts

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidator {
  static nameRules(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return { required: 'Nome é obrigatório' };
      }

      if (value.length < 5) {
        return { minLength: 'Nome deve ter pelo menos 5 caracteres' };
      }

      return null;
    };
  }

  static usernameRules(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return { required: 'Nome de usuário é obrigatório' };
      }

      if (value.length < 3 || !/^[a-zA-Z0-9]*$/.test(value)) {
        return { invalidUsername: 'Nome de usuário deve ter pelo menos 3 caracteres e conter apenas letras e números' };
      }

      return null;
    };
  }

  static emailRules(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return { required: 'Email é obrigatório' };
      }

      if (!/.+@.+\..+/.test(value)) {
        return { invalidEmail: 'Deve ser um email válido' };
      }

      return null;
    };
  }

  static passwordRules(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return { required: 'Senha é obrigatória' };
      }

      if (value.length < 8) {
        return { minLength: 'A senha deve ter pelo menos 8 caracteres' };
      }

      return null;
    };
  }
}

