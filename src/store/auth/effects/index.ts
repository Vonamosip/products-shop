import { LoginEffect } from './login.effect';
import { LogoutEffect } from './logout.effect';
import { RefreshTokensEffect } from './refresh-tokens.effect';
import { RegisterEffect } from './register.effects';

export const AuthEffects = [
  LoginEffect,
  LogoutEffect,
  RefreshTokensEffect,
  RegisterEffect
];
