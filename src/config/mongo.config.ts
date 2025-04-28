import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("DB'ga ulandi ✅");
  } catch (error) {
    console.log("DB'ga ulanishda xatolik ❌");
  }
};

export default connectDb;
