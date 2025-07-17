import { Request, Response } from "express";
import Brand from "../models/brand.model";
import { asyncHandler } from "../utils/async-handler.utils";
import { CustomError } from "../middleware/error-handler.middleware";

// create brand(post)
export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const brandExists = await Brand.findOne({ name });
  if (brandExists) {
    throw new CustomError("Brand already exists", 400);
  }

  const brand = await Brand.create({ name, description });

  res.status(201).json({
    message: "Brand created successfully",
    success: true,
    data: brand,
  });
});

// get all brands(get)
export const getAllBrands = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, query } = req.query;

    // Create filter object with $or and $and conditions
    const filter: any = {};

    if (query) {
      // General search that looks in both name and description
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    } else {
      // Specific field filters if no general query is present
      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }
      if (description) {
        filter.description = { $regex: description, $options: "i" };
      }
    }

    // Add additional filters here if needed (like status, etc.)
    // if (status) {
    //   filter.status = status;
    // }

    // Fetch brands based on the filter
    const brands = await Brand.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Brands fetched successfully",
      success: true,
      data: brands,
    });
  }
);

// get single brand by id (get)
export const getBrandById = asyncHandler(
  async (req: Request, res: Response) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      throw new CustomError("Brand not found", 404);
    }
    res.status(200).json({
      message: "Brand fetched successfully",
      success: true,
      data: brand,
    });
  }
);

// update brand(post)
export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );

  if (!brand) {
    throw new CustomError("Brand not found", 404);
  }

  res.status(200).json({
    message: "Brand updated successfully",
    success: true,
    data: brand,
  });
});

// delete brand (delete)
export const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
  if (!deletedBrand) {
    throw new CustomError("Brand not found", 404);
  }
  res.status(200).json({
    message: "Brand deleted successfully",
    success: true,
    data: deletedBrand,
  });
});
