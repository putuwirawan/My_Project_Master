export interface LogingModel {
  userId: string;
  username: string;
  access_token: string;
  refresh_token: string;
  cart_token: string;
  role: string;
}
export interface RegisterModel {
  id?: string;
  code: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  type: string;
}
export interface LoginState {
  loginUser: LogingModel | undefined;
  errorLogin: any | undefined;
  isLogin: boolean;
}

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const ERROR_LOGIN = 'ERROR_LOGIN';

interface Login {
  type: typeof LOGIN_USER;
  userData: LogingModel;
}
interface Logout {
  type: typeof LOGOUT_USER;
}
interface ErrorLogin {
  type: typeof ERROR_LOGIN;
  error: any;
}
export type LogingAction = Login | Logout | ErrorLogin;
