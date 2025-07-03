import { CustomError } from "./../middleware/error-handler.middleware";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Product from "../models/product.model";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const userID = req.user._id;
  const { productId } = req.body;

  if (!productId) {
    throw new CustomError("Product ID is required", 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  const user = await User.findById(userID);
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const isProductAlreadyExists = user.wishlist.find(
    (product) => product === product._id
  );

  if (isProductAlreadyExists) {
    user.wishlist = user.wishlist.filter((product) => product !== product._id);
  } else {
    user.wishlist.push(product._id);
  }

  await user.save();

  res.status(201).json({
    message: `${isProductAlreadyExists ? "Removed from" : "Added to"}wishlist`,
    status: "success",
    success: true,
    data: user.wishlist,
  });
});

export const clear = asyncHandler(async (req: Request, res: Response) => {
  const userID = req.user._id;
  const user = await User.findById(userID);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  user.wishlist = [];
  await user.save();
  res.status(200).json({
    message: "Wishlist cleared",
    status: "success",
    success: true,
    data: null,
  });
});
