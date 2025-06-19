import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './auth.state';

export const authFeatureSelector = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.isLoggedIn
);

export const accessTokenSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.accessToken
);

export const refreshTokenSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.refreshToken
);

export const authSelectors = {

};