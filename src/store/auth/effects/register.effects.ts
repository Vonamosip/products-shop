import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { AuthService } from '../../../app/services/auth.service';
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.action';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffect {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap((registerData) => {
      return this.authService.register(registerData).pipe(
        map(() => registerSuccessAction(),
                  this.router.navigate(['/auth/login'])
        ),
        catchError(() => of(registerFailureAction()))
      )
    })
  ));
}