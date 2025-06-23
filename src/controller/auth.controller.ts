import { generateJwtToken } from "./../utils/jwt.utils";
import { hash, compare } from "../utils/bcrypt"; //  both hash and compare are imported
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { asyncHandler } from "../utils/async-handler.utils";
import { CustomError } from "../middleware/error-handler.middleware";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    console.log("register");

    const { email, full_name, password, phone } = req.body;

    if (!password) {
      throw new CustomError("Password is required", 400);
    }

    const hashedPassword = await hash(password);
    console.log(
      "~ auth.controller.ts:24 ~register ~hashedPassword",
      hashedPassword
    );

    const user = await User.create({
      email,
      full_name,
      password: hashedPassword,
      phone,
    });

    if (!user) {
      throw new CustomError("Register failed. Try again.", 400);
    }

    res.status(201).json({
      message: "Register success",
      success: true,
      status: "success",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
      status: "fail",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError("User  not found", 400);
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new CustomError("Invalid password", 400);
    }

    const payload = {
      id: user._id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    };
    const token = await generateJwtToken(user);
    res.status(200).json({
      message: "Login success",
      success: true,
      status: "success",
      data: {
        user,
        access_: token,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
      status: "fail",
    });
  }
};
