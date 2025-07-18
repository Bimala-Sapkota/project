import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import CustomError, {
  errorHandler,
} from "./middleware/error-handler.middleware";
import { connectDb } from "./config/db-connect";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// importing routes
import authRoutes from "./routers/auth.routes";
import categoryRoutes from "./routers/category.routes";
import productRoutes from "./routers/product.routes";
import cartRoutes from "./routers/cart.routes";
import wishlistRouter from "./routers/wishlist.routes";
import orderRouters from "./routers/order.routes";
import brandRouter from "./routers/brand.routes";
import userRouter from "./routers/user.routes";

const app = express();
const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI ?? "";

//

// connecting database
connectDb(DB_URI);

// using middlewares
// to set security headers / removes insecure headers
app.use(helmet());
// parse req cookie
app.use(cookieParser());
// parse url-encoded data
app.use(express.urlencoded({ extended: true }));

// parse json data
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up & running",
  });
});

// using routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/order", orderRouters);
app.use("/api/brand", brandRouter);
app.use("/api/user", userRouter);

app.all("/{*spalt}", (req: Request, res: Response, next: NextFunction) => {
  const message = `Can not ${req.method} on ${req.url}`;

  const error = new CustomError(message, 404);

  next(error);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(errorHandler);
