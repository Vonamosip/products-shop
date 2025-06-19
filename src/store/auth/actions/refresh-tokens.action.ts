import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const refreshTokensAction = createAction(
  ActionTypes.REFRESH_TOKENS,
  props<{ refreshToken: string }>()
);

export const refreshTokensSuccessAction = createAction(
  ActionTypes.REFRESH_TOKENS_SUCCESS,
  props<{ accessToken: string; refreshToken: string }>()
);

export const refreshTokensFailureAction = createAction(
  ActionTypes.REFRESH_TOKENS_FAILURE
);