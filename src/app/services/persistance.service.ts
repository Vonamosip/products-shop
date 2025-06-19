import { Injectable } from '@angular/core';
import {jwtDecode, JwtPayload} from "jwt-decode";
import { AuthTokensEnum } from '../enums/auth-tokens.enum';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  public setToken(key: string, token: string): void {
    try {
      sessionStorage.setItem(key, token);
    } catch (err) {
      console.log('Error saving token to sessionStorage', err);
    }
  }

  public getToken(key: string): string | null {
    try {
      return sessionStorage.getItem(key);
    } catch (err) {
      console.log('Error getting token from sessionStorage', err)
    }

    return null
  }

  public removeTokens(): void {
    sessionStorage.removeItem(AuthTokensEnum.ACCESS_TOKEN);
    sessionStorage.removeItem(AuthTokensEnum.REFRESH_TOKEN);
  }

  public isTokenExpired(token: string): boolean {
    const decodedToken: JwtPayload = jwtDecode(token);

    return decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;
  }
}