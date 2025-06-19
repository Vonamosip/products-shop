import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const setIsLoggedInAction = createAction(
  ActionTypes.SET_IS_LOGGED_IN,
  props<{ isLoggedIn: boolean }>()
);
