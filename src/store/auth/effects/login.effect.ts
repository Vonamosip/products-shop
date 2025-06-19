import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PersistenceService } from '../../../app/services/persistance.service';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.action';
import { of } from 'rxjs';
import { AuthTokensEnum } from '../../../app/enums/auth-tokens.enum';
import { IAuthTokens } from '../../../app/models/auth-token.interface';
import { AuthService } from '../../../app/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffect {
  private readonly actions$ = inject(Actions)
  private readonly persistence = inject(PersistenceService)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  public login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      switchMap((action) => this.authService.login(action.loginRequest).pipe(
        map((authTokens: IAuthTokens) => {
          this.persistence.setToken(AuthTokensEnum.ACCESS_TOKEN, authTokens.access_token);
          this.persistence.setToken(AuthTokensEnum.REFRESH_TOKEN, authTokens.refresh_token);
          return loginSuccessAction({ authTokens });
        }),
        catchError(() => of(loginFailureAction()))
      ))
    )
  });

  public redirectAfterSubmit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(() => {
        this.router.navigateByUrl('/dashboard');
      })
    )
  }, { dispatch: false });
}