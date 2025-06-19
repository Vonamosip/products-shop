import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  private readonly router = inject(Router);

  canActivate(): boolean {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}