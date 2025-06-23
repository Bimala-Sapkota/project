import "dotenv/config";
import helmet from "helmet";
import express, { NextFunction, Request, Response } from "express";
import { connectDB } from "./config/db-connect";

import CustomError from "./middleware/error-handler.middleware";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error-handler.middleware";

import categoryRoutes from "./routers/category.routes";
import productRoutes from "./routers/product.routes";
import authRoutes from "./routers/auth.routes";

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI ?? "";
console.log(PORT);
const app = express();

connectDB(DB_URI);

app.use(cookieParser());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("object");
  res.status(200).json({
    message: "Hello, World!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);

// Corrected wildcard route handling
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const message = `Cannot ${req.method} on ${req.url}`;
  const error = new CustomError(message, 404);
  return next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
