import mongoose, { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  devices: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    devices: [{ type: mongoose.SchemaTypes.ObjectId, ref: "UserDevice" }],
  },
  {
    collection: "users",
    timestamps: true, 
    versionKey: false, 
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const bcrypt = require("bcrypt");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.findByEmail = async function (email: string) {
  return await this.findOne({ email });
};

export default mongoose.model<IUser>("User", UserSchema);
