import { hash, compare } from "../utils/bcrypt"; //  both hash and compare are imported
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
//import { generateToken } from "../utils/token"; //  generateToken is imported

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
      throw new Error("Password is required");
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
      throw new Error("Register failed. Try again.");
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
      throw new Error("User  not found");
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    // const token = await generateToken(user);
    res.status(200).json({
      message: "Login success",
      success: true,
      status: "success",
      data: user,
      ///data: token,
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
