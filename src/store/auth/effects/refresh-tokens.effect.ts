
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, of, catchError } from 'rxjs';
import { AuthService } from '../../../app/services/auth.service';
import {  refreshTokensAction, refreshTokensFailureAction } from '../actions/refresh-tokens.action';
import { AuthTokensEnum } from '../../../app/enums/auth-tokens.enum';
import { PersistenceService } from '../../../app/services/persistance.service';
import { IAuthTokens } from '../../../app/models/auth-token.interface';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokensEffect {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly persistence = inject(PersistenceService);
  private readonly router = inject(Router);

  refreshTokens$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(refreshTokensAction),
      switchMap(() => {
        const refreshToken = this.persistence.getToken(AuthTokensEnum.REFRESH_TOKEN);
        if (!refreshToken) {
          return of(refreshTokensFailureAction());
        }

        return this.authService.refreshTokens(refreshToken).pipe(
          map((authTokens: IAuthTokens) => {
            this.persistence.setToken(AuthTokensEnum.ACCESS_TOKEN, authTokens.access_token);
            this.persistence.setToken(AuthTokensEnum.REFRESH_TOKEN, authTokens.refresh_token);
            return refreshTokensAction({ refreshToken: authTokens.refresh_token });
          }),
          catchError(() => {
            this.persistence.removeTokens();
            this.router.navigateByUrl('/auth/login');
            return of(refreshTokensFailureAction());
          })
        );
      })
    )
  })
}