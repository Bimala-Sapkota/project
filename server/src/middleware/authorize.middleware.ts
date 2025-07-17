import { Request, Response, NextFunction } from "express";
import { CustomError } from "./error-handler.middleware";
import { Role } from "../types/global.types";

export const authorize =
  (allowedRoles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new CustomError("Unauthorized: user not found", 401);
    }

    if (!allowedRoles.includes(user.role)) {
      throw new CustomError("Forbidden: you do not have permission", 403);
    }

    next();
  };
