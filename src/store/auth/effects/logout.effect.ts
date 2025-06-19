import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { PersistenceService } from '../../../app/services/persistance.service';
import { logoutAction } from '../actions/logout.action';
import { Router } from '@angular/router';

@Injectable()
export class LogoutEffect {
  private readonly actions$ = inject(Actions);
  private readonly persistence = inject(PersistenceService);
  private readonly router = inject(Router);

  public logout$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(logoutAction),
      tap(() => {
        this.persistence.removeTokens();
        this.router.navigateByUrl('/auth/login');
      })
    );
  })
}
