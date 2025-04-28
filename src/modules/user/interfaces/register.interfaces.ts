import { IUser } from "../models";

export interface IRegisterRequest {
    name: string;
    password: string;
    email: string;
}

export interface IRegisterResponse {
    message: string;
    data: IUser
}export * from './user'
