import { CustomError } from "./../middleware/error-handler.middleware";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Product from "../models/product.model";
import User from "../models/user.model";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const { productId } = req.body;

  if (!productId) {
    throw new CustomError("product id is required", 400);
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("product not found", 404);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  const isProductAlreadyExists = user.wishlist.find(
    (wishlistProduct) => wishlistProduct.toString() === product._id.toString()
  );

  console.log(isProductAlreadyExists);

  if (isProductAlreadyExists) {
    user.wishlist = user.wishlist.filter(
      (wishlistProduct) => wishlistProduct.toString() !== product._id.toString()
    );
  } else {
    user.wishlist.push(product._id);
  }

  await user.save();

  res.status(201).json({
    message: `${isProductAlreadyExists ? "Removed from" : "Added to"} wishlist`,
    status: "success",
    success: true,
    data: user.wishlist,
  });
});

export const clear = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  user.wishlist = [];

  await user.save();

  res.status(200).json({
    message: `wishlist cleared`,
    status: "success",
    success: true,
    data: null,
  });
});

// get wishlist

export const getall = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  user.wishlist = [];

  await user.save();

  res.status(200).json({
    message: `wishlist cleared`,
    status: "success",
    success: true,
    data: null,
  });
});

// get by id
export const getById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId } = req.params; // Assuming the product ID is passed as a URL parameter

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  // Check if the product is in the user's wishlist
  const productInWishlist = user.wishlist.find(
    (wishlistProduct) => wishlistProduct.toString() === productId
  );

  if (!productInWishlist) {
    throw new CustomError("product not found in wishlist", 404);
  }

  // Optionally, you can retrieve the product details if needed
  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("product not found", 404);
  }

  res.status(200).json({
    message: "Product found in wishlist",
    status: "success",
    success: true,
    data: product,
  });
});
