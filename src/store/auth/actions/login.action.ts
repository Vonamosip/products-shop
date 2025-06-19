import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { IAuthForm } from '../../../app/pages/auth/models/auth-form.interface';
import { IAuthTokens } from '../../../app/models/auth-token.interface';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ loginRequest: IAuthForm }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ authTokens: IAuthTokens }>()
);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE
);
