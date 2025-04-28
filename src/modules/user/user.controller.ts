import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";
import { IRequest } from "../../interfaces";
import { ILoginRequest, IRegisterRequest } from "./interfaces";

class UserController {
  private readonly service;

  constructor() {
    this.service = UserService;
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this.service.getAllUsers();
      res.status(200).json({
        message: "Users fetched successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  register = async (
    req: IRequest<IRegisterRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this.service.register(req.body);
      res.status(201).json({
        message: "User registered successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: IRequest<ILoginRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this.service.login(req.body);
      res.status(200).json({
        message: "User logged in successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.params.id;
      if (!userId) {
        throw new Error("User ID is required");
      }

      await this.service.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.params.id;
      if (!userId) {
        throw new Error("User ID is required");
      }

      const data = await this.service.updateUser(userId, req.body);
      res.status(200).json({
        message: "User updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
