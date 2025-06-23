import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/global.types";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use a strong secret key
const JWT_EXPIRED_IN = process.env.JWT_EXPIRED_IN || "1h"; // Token expiration time

export const generateJwtToken = (payload: JWTPayload): string => {
  // Ensure payload is an object
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Payload must be a non-null object");
  }
  return jwt.sign(payload as object, JWT_SECRET, { expiresIn: JWT_EXPIRED_IN });
};

export const decodeJWTToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload; // Cast the result to JWTPayload
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // Return null if verification fails
  }
};
