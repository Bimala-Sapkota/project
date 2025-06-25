import { Role } from "./../types/global.types";
import { NextFunction, Request, Response } from "express";
import CustomError from "./error-handler.middleware";
import { decodeJWTToken } from "../utils/jwt.utils";
import User from "../models/user.model";
import { JWTPayloadDecoded } from "../types/global.types";

export const authenticate = (roles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //1.get token from req (req.cookie)
      const token = req.cookies.access_token;
      // const token  = req.headers['authorization']
      if (!token) {
        throw new CustomError("Unauthorized. Access denied", 401);
      }

      // check validity of token
      const decodedData = decodeJWTToken(token) as JWTPayloadDecoded;

      if (!decodedData) {
        throw new CustomError("Unauthorized. Access denied", 401);
      }

      const user = await User.findOne({ email: decodedData.email });

      if (!user) {
        throw new CustomError("Unauthorized. Access denied", 401);
      }

      if (roles && !roles.includes(user.role)) {
        throw new CustomError("Unauthorized. Access denied", 403);
      }

      if (decodedData.exp * 1000 < Date.now()) {
        res.clearCookie("access_token", {
          httpOnly: true,
        });
        throw new CustomError("Unauthorized. Access denied", 401);
      }

      next();

      console.log(decodedData);

      console.log(token);
    } catch (err) {
      next(err);
    }
  };
};
