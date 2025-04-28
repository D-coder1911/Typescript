import { IUser } from "../models";

export interface IGetAllUsersRequest {
  limit: number;
  page: number;
}

export interface IGetAllUsersResponse {
  message: string;
  count: number;
  data: IUser[];
}
