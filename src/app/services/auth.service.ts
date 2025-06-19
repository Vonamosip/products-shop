import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmailAvailabilityResponse, IUser } from '../models/user.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environment/environment';
import { IAuthTokens } from '../models/auth-token.interface';
import { IRegisterForm } from '../pages/auth/models/auth-form.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly handler = inject(HttpBackend);

  login(user: IUser): Observable<IAuthTokens> {
    return this.http.post<IAuthTokens>(`${environment.ApiUrl}/auth/login`, user);
  }

  register(user: IRegisterForm): Observable<IRegisterForm> {
    return this.http.post<IRegisterForm>(`${environment.ApiUrl}/users/`, user);
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.post<{ isAvailable: boolean }>(
      `${environment.ApiUrl}/users/is-available`,
      { email }
    ).pipe(
      map(response => {
        console.log('Email check response:', response);
        return response.isAvailable;
      }),
      catchError(err => {
        console.error('Ошибка при проверке email:', err);
        return of(true);
      })
    );
  }

  public refreshTokens(refreshToken: string): Observable<IAuthTokens> {
    const http: HttpClient = new HttpClient(this.handler);

    return http.get<IAuthTokens>(`${environment.ApiUrl}/auth/refresh-token`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${refreshToken}`
      })
    });
  }
}
