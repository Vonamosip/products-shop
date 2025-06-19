import { AbstractControl, ValidationErrors } from '@angular/forms';

export function compareValidator<T>(prop1: keyof T, prop2: keyof T) {
  return function passwordMatchValidator(control: AbstractControl<T>): ValidationErrors | null {
    const password = control.get(prop1 as string);
    const repeatPassword = control.get(prop2 as string);

    if (password?.value !== repeatPassword?.value) {
      repeatPassword?.setErrors({ mismatch: true });
    } else {
      repeatPassword?.setErrors(null);
    }

    return null;
  }
}