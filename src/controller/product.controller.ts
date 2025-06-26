import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Product from "../models/product.model";
import { CustomError } from "../middleware/error-handler.middleware";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const { coverImage, images } = req.files as {
    coverImage: Express.Multer.File[];
    images: Express.Multer.File[];
  };

  console.log(coverImage);

  if (!coverImage || coverImage.length > 0) {
    throw new CustomError("coverImage is required", 404);
  }

  const product = new Product(data);

  product.coverImage = {
    path: coverImage[0].path,
    public_id: coverImage[0].fieldname,
  };

  await product.save();

  res.status(201).json({
    status: "success",
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

// Get all products
export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      message: "All products retrieved",
      success: true,
      data: products,
    });
  }
);

// Get product by ID
export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) throw new CustomError("Product not found", 404);

    res.status(200).json({
      status: "success",
      message: "Product retrieved",
      success: true,
      data: product,
    });
  }
);

// Update product
export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidation: true,
    });
    if (!updated) throw new CustomError("Product not found for update", 404);

    res.status(200).json({
      status: "success",
      message: "Product updated",
      success: true,
      data: updated,
    });
  }
);

// Delete product
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new CustomError("Product not found for update", 404);

    res.status(200).json({
      message: "Product deleted",
      status: "success",
      success: true,
      data: null,
    });
  }
);
