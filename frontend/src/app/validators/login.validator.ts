// src/app/validators/login.validator.ts

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class LoginValidator {
  static identifierRules(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return { required: 'Email ou nome de usuário é obrigatório' };
      }

      const isValidEmail = /.+@.+\..+/.test(value);
      const isValidUsername = value.length >= 3;

      if (!(isValidEmail || isValidUsername)) {
        return { invalidIdentifier: 'Deve ser um email válido ou um nome de usuário com pelo menos 3 caracteres' };
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