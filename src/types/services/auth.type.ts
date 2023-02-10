import { IUserOutput } from "../models/user.type";

export interface IAuthData {
  id?: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUserOutput;
  token: string;
}
