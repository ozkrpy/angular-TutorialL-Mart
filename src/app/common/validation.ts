import { Validators } from '@angular/forms';

export const EmailValidations = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(50)
];
