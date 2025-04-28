import { IUser, IUserDevice } from "../models";

export interface ILoginRequest {
  password: string;
  email: string;
  userAgent: string;
}

export interface ILoginResponse {
  message: string;
  data: IUser;
  device: IUserDevice
}
