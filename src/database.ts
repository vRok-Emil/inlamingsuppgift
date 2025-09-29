import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:3000/mydatabase"
    );
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log("❌ MongoDB not connected");
    console.log(error);
    process.exit(1);
  }
}
