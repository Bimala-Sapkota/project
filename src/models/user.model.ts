import mongoose from "mongoose";
import { Role } from "../types/global.types";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "full_name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: [true, " user already exist with provided email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      min: [6, "password must be  at least 6 char . long"],
      trim: true,
    },
    phone: {
      type: String,

      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
