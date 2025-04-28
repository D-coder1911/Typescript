import mongoose, { Document, Types } from "mongoose";

export interface IUserDevice extends Document {
  browser?: string;
  deviceType: string;
  modelName?: string;
  vendor?: string;
  user?: Types.ObjectId;
}

const UserDeviceSchema = new mongoose.Schema<IUserDevice>(
  {
    browser: { type: String },
    deviceType: { type: String, required: true },
    modelName: { type: String },
    vendor: { type: String },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  {
    collection: "user_devices",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IUserDevice>("UserDevice", UserDeviceSchema);
