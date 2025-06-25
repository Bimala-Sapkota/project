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

    //hashing User Password
    const hashedPassword = await hash(password);
    //creating user
    const user = await User.create({
      email,
      full_name,
      password: hashedPassword,
      phone,
    });
    //throw error
    if (!user) {
      throw new CustomError("Registration Failed. Try Again later.", 500);
    }

    //success response
    res.status(201).json({
      //in create 201 status
      message: "User Registered",
      success: true,
      status: "success",
      data: user,
    });
  } catch (error: any) {
    // res.status(500).json({
    //   message: error?.message ?? "internet Server Error",
    //   success: false,
    //   status: "fail",
    // });
    next(error);
  }
};

//login Success=====
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // body (email,password)
      const { email, password } = req.body;

      if (!email) {
        throw new CustomError("Email is Required", 400);
      }

      if (!password) {
        throw new CustomError("Password is Required", 400);
      }

      // find user by email
      const user = await User.findOne({ email });

      // if !user => error
      if (!user) {
        throw new CustomError("Email or password does not match", 404);
      }

      // compare password
      const isPasswordMatched = await compare(password, user.password);

      // !match -> error
      if (!isPasswordMatched) {
        throw new CustomError("Email or password does not match", 400);
      }

      const payload = {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      };
      const token = generateJwtToken(user);

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge:
            parseInt(process.env.COOKIE_EXPIRES_IN ?? "1") *
            24 *
            60 *
            60 *
            1000,
          secure: false, //true in case of going on products
        })
        .json({
          message: "Login success",
          success: true,
          status: "success",
          data: {
            user,
            access_token: token,
          },
        });
    } catch (error: any) {
      // res.status(500).json({
      //   message: "Internal Server Error",
      //   error: error.message,
      //   success: false,
      //   status: "fail",

      next(error);
    }
  }
);
