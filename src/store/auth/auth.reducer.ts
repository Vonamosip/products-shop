import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import { logoutAction } from './actions/logout.action';
import { setIsLoggedInAction } from './actions/set-isLoggedIn.action';
import { loginSuccessAction, loginFailureAction } from './actions/login.action';
import { refreshTokensFailureAction, refreshTokensSuccessAction } from './actions/refresh-tokens.action';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccessAction,
    (state: AuthState) => ({
      ...state,
      isLoggedIn: true
    })
  ),
  on(loginFailureAction,
    (state: AuthState) => ({
      ...state,
      isLoggedIn: false
    })
  ),
  on(refreshTokensSuccessAction,
    (state: AuthState) => ({
      ...state,
      isLoggedIn: true
    })
  ),
  on(refreshTokensFailureAction,
    (state: AuthState) => ({
      ...state,
      isLoggedIn: false
    })
  ),
  on(setIsLoggedInAction,
    (state: AuthState, { isLoggedIn }) => ({
      ...state,
      isLoggedIn: isLoggedIn
    })
    ),
  on(logoutAction,
    () => ({
      ...initialAuthState
    })
  ),
);
