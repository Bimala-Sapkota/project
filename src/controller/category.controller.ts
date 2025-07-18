import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Category from "../models/category.model";
import CustomError, {
  errorHandler,
} from "../middleware/error-handler.middleware";
// post category
export const create = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const category = await Category.create({ name, description });

  if (!category) {
    throw new CustomError("Something went wrong", 500);
  }

  res.status(201).json({
    message: "Category created.",
    success: true,
    status: "success",
    data: category,
  });
});

// get all categories with optional filtering
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.query;
  // Create a filter object
  const filter: Record<string, any> = {};

  if (name) {
    filter.name = {
      $regex: name, // Use regex for partial matching
      $options: "i", // Case insensitive
    };
  }
  if (description) {
    filter.description = {
      $regex: description, // Use regex for partial matching
      $options: "i", // Case insensitive
    };
  }

  const categories = await Category.find(filter);

  //await sendEmail();
  res.status(200).json({
    message: "All category fetched",
    success: true,
    status: "success",
    data: categories,
  });
});

// get by id
export const getById = asyncHandler(async (req: Request, res: Response) => {
  // get id from req.params
  const { id } = req.params;

  // get category by given id
  const category = await Category.findById(id);

  if (!category) {
    throw new CustomError("Category not found", 400);
  }

  res.status(200).json({
    message: `Category by id ${id} fetched`,
    success: true,
    status: "success",
    data: category,
  });
});

// update category

export const update = asyncHandler(async (req: Request, res: Response) => {
  // get category id from params
  const { id } = req.params;

  // get body data to update
  const { name, description } = req.body;

  // find category by id
  const category = await Category.findById(id);
  // const updatedCategory = await Category.findByIdAndUpdate(id,{name,description},{new:true})

  if (!category) {
    throw new CustomError("category not found", 400);
  }

  if (name) {
    category.name = name;
  }
  if (description) {
    category.description = description;
  }

  await category.save();

  res.status(200).json({
    message: "Category updated",
    data: category,
    success: true,
    status: "success",
  });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new CustomError("Category not found", 400);
  }

  res.status(200).json({
    message: "Category deleted",
    success: true,
    status: "success",
    data: null,
  });
});
