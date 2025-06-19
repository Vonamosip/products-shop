export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null
};

export const authFeatureKey = 'auth';
