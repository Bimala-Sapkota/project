import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Product from "../models/product.model";
import { CustomError } from "../middleware/error-handler.middleware";

// Create product
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, price, stock, brand, features, description } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
      brand,
      features,
      description,
    });

    res.status(201).json({
      message: "Product created",
      success: true,
      data: product,
    });
  }
);

// Get all products
export const getAllProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json({
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

    const updated = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) throw new CustomError("Product not found for update", 404);

    res.status(200).json({
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

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted",
      success: true,
      data: null,
    });
  }
);
