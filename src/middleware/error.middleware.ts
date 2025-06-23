import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

export const globalErrorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err instanceof CustomError && err.statusCode) || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ Error] ${statusCode}: ${message}`);

  return res.status(statusCode).json({
    success: false,
    status: "fail",
    message,
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
};
