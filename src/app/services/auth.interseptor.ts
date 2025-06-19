import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { MonoTypeOperatorFunction, Observable, tap } from 'rxjs';
import { PersistenceService } from './persistance.service';
import { AuthTokensEnum } from '../enums/auth-tokens.enum';
import { logoutAction } from '../../store/auth/actions/logout.action';
import { refreshTokensAction } from '../../store/auth/actions/refresh-tokens.action';

const handleAuthError = (): MonoTypeOperatorFunction<any> => tap(
  () => {},
  err => {
    if (err.status === 401) {
      inject(Store).dispatch(logoutAction());
    }
  }
);

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor {
  private readonly persistence = inject(PersistenceService);
  private readonly store = inject(Store);

  private createRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.persistence.getToken(AuthTokensEnum.ACCESS_TOKEN);
    const refreshToken = this.persistence.getToken(AuthTokensEnum.REFRESH_TOKEN);

    if(!accessToken || !refreshToken || this.persistence.isTokenExpired(refreshToken)) {
      this.store.dispatch(logoutAction());

      return next.handle(request);
    }

    request = this.createRequest(request, accessToken);

    if(this.persistence.isTokenExpired(accessToken)) {
      this.store.dispatch(refreshTokensAction({ refreshToken }));

      return next.handle(request).pipe(
        handleAuthError()
      );
    }

    request = this.createRequest(request, accessToken);

    return next.handle(request).pipe(
      handleAuthError()
    );
  }
}