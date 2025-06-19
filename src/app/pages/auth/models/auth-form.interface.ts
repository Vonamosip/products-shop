export interface IAuthForm {
  email: string;
  password: string;
}

export interface IRegisterForm extends IAuthForm {
  name: string;
  role: string;
  avatar: File | null;
}

export interface IRegisterFormWithConfirmPassword extends IRegisterForm {
  confirmPassword: string;
}
