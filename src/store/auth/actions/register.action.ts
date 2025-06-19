import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { IRegisterForm } from '../../../app/pages/auth/models/auth-form.interface';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<IRegisterForm>()
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
);

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
);
