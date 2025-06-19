import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, of, timer, switchMap, map, catchError } from "rxjs";
import { AuthService } from "../services/auth.service";

export function checkEmailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl):Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    return timer(500).pipe(
      switchMap(() => authService.checkEmail(control.value)),
      map(isAvailable => isAvailable ? null : { emailTaken: true }),
      catchError((err) => {
        console.error('Ошибка при проверке email:', err);
        return of(null);
      })
    );
  };
}