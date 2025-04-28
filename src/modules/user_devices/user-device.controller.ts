import { NextFunction, Request, Response } from "express";
import UserDeviceService from "./user-device.service";

class UserDeviceController {
  private readonly service;

  constructor() {
    this.service = UserDeviceService;
  }

  getAllDevices = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this.service.getAllDevices();
      res.status(200).json({
        message: "Devices fetched successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getDeviceById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const deviceId = req.params.id;
      if (!deviceId) {
        throw new Error("Device ID is required");
      }

      const data = await this.service.getDeviceById(deviceId);
      res.status(200).json({
        message: "Device fetched successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  addDevice = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this.service.addDevice(req.body);
      res.status(201).json({
        message: "Device added successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateDevice = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const deviceId = req.params.id;
      if (!deviceId) {
        throw new Error("Device ID is required");
      }

      const data = await this.service.updateDevice(deviceId, req.body);
      res.status(200).json({
        message: "Device updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteDevice = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const deviceId = req.params.id;
      if (!deviceId) {
        throw new Error("Device ID is required");
      }

      await this.service.deleteDevice(deviceId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default new UserDeviceController();
