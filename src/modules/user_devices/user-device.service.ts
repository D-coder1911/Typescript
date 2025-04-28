import UserDevice from "../../modules/user/models/user-device.model";

class UserDeviceService {
  async getAllDevices() {
    const devices = await UserDevice.find().populate("user").lean();
    return devices;
  }

  async getDeviceById(id: string) {
    const device = await UserDevice.findById(id).populate("user").lean();
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    return device;
  }

  async addDevice(data: any) {
    const device = await UserDevice.create(data);
    return device;
  }

  async updateDevice(id: string, data: any) {
    const device = await UserDevice.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    return device;
  }

  async deleteDevice(id: string) {
    const device = await UserDevice.findByIdAndDelete(id);
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
  }
}

export default new UserDeviceService();
