import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const register = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, full_name, password, phone } = req.body;

    const user = User.create({ email, full_name, password, phone });

    if (!user) {
      throw new Error("Register fail . tyr again");
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
      status: "fail,",
    });
  }
};
