import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Product from "../models/product.model";
import CustomError, {
  errorHandler,
} from "../middleware/error-handler.middleware";
import path from "path";
import Category from "../models/category.model";
import { removeImages } from "../config/cloudinary.conflict.";
import { IImages } from "../types/global.types";
import { getPagination } from "../utils/pagination.utils";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const { coverImage, images } = req.files as {
    coverImage: Express.Multer.File[];
    images: Express.Multer.File[];
  };

  console.log(coverImage);

  if (!coverImage || coverImage.length === 0) {
    throw new CustomError("coverImage is required", 404);
  }

  const product = new Product(data);

  product.coverImage = {
    path: coverImage[0].path,
    public_id: path.basename(coverImage[0].path),
  };

  if (images && images.length > 0) {
    const imagePath: { path: string; public_id: string }[] = images.map(
      (image) => ({
        path: image.path,
        public_id: path.basename(image.path),
      })
    );

    product.images = imagePath as any;
  }

  await product.save();

  res.status(201).json({
    status: "success",
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const { query, minPrice, maxPrice, limit, page } = req.query;
  const filter: Record<string, any> = {};

  console.log(query);

  //pagination
  const perPage = parseInt(limit as string) ?? 10;
  const currentPage = parseInt(page as string) ?? 1;

  //calculate skip
  const skip = (currentPage - 1) * perPage;

  if (query) {
    filter.$or = [
      {
        name: {
          $regex: query, // regex is used for patron match
          $options: "i", // hami le patako product ko auta matra word correct vayo vane vslu dekaune
        },
      },
      {
        descritiop: {
          $regex: query,
          $options: "i",
        },
      },
    ];
  }

  if (minPrice || maxPrice) {
    if (minPrice && maxPrice) {
      filter.price = {
        $lte: Number(maxPrice as string),
        $gte: Number(minPrice as string),
      };
    }

    if (minPrice) {
      filter.price = {
        $gte: Number(minPrice as string),
      };
    }
    if (maxPrice) {
      filter.price = {
        $lte: Number(maxPrice as string),
      };
    }
  }

  const products = await Product.find(filter)
    .limit(perPage)
    .skip(skip)
    .sort({ createdAt: -1 })
    .populate("category");

  const totalData = await Product.countDocuments(filter);

  const pagination = getPagination(totalData, perPage, currentPage);

  res.status(200).json({
    status: "success",
    success: true,
    message: "Products fetched successfully",
    data: {
      data: products,
      pagination,
    },
  });
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id }).populate("category");

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  res.status(200).json({
    status: "success",
    success: true,
    message: "Product fetched successfully",
    data: product,
  });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  res.status(200).json({
    status: "success",
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  res.status(200).json({
    status: "success",
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
});
