import { UAParser } from "ua-parser-js";
import {
  IGetAllUsersResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "./interfaces";
import userModel from "./models/user.model";
import userDeviceModel from "./models/user-device.model";

class UserService {
  private readonly userModel;
  private readonly userDeviceModel;

  constructor() {
    this.userModel = userModel;
    this.userDeviceModel = userDeviceModel;
  }

  getAllUsers = async (): Promise<IGetAllUsersResponse> => {
    const users = await this.userModel.find().populate("devices").lean();
    return {
      message: "success",
      count: users.length,
      data: users,
    };
  };

  getUserById = async (id: string): Promise<any> => {
    const user = await this.userModel.findById(id).populate("devices").lean();

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return {
      message: "success",
      data: user,
    };
  };

  register = async (payload: IRegisterRequest): Promise<IRegisterResponse> => {
    const foundedUser = await this.userModel.findOne({ email: payload.email });

    if (foundedUser) {
      throw new Error("User with this email already exists");
    }

    const user = await this.userModel.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });

    return {
      message: "success",
      data: user,
    };
  };

  login = async (payload: ILoginRequest): Promise<ILoginResponse> => {
    const foundedUser = await this.userModel.findOne({
      email: payload.email,
      password: payload.password,
    });

    if (!foundedUser) {
      throw new Error("Invalid email or password");
    }

    const { browser, device } = UAParser(payload.userAgent);

    let foundedDevice = await this.userDeviceModel.findOne({
      user: foundedUser._id,
      deviceType: device?.type ?? "desktop",
    });

    if (!foundedDevice) {
      foundedDevice = await this.userDeviceModel.create({
        user: foundedUser._id,
        deviceType: device?.type ?? "desktop",
        browser: browser.name,
        modelName: device.model,
        vendor: device.vendor,
      });

      await this.userModel.updateOne(
        { _id: foundedUser._id },
        { $push: { devices: foundedDevice._id } }
      );
    }

    return {
      message: "success",
      data: foundedUser,
      device: foundedDevice,
    };
  };

  deleteUser = async (id: string): Promise<void> => {
    const foundedUser = await this.userModel.findById(id);

    if (!foundedUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    await this.userModel.deleteOne({ _id: id });
  };

  updateUser = async (id: string, payload: any): Promise<any> => {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    return {
      message: "success",
      data: updatedUser,
    };
  };
}

export default new UserService();
