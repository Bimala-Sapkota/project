import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Category from "../models/category.model";
import { CustomError } from "../middleware/error-handler.middleware";
export const create = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const category = await Category.create({ name, description });
  if (!category) {
    throw new CustomError("something went wrong", 500);
  }

  res.status(201).json({
    message: "Category Created",
    success: true,
    status: "success",
    data: category,
  });
});

// get all category

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.find();
  res.status(201).json({
    message: " all Category found",
    success: true,
    status: "success",
    data: category,
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
    res.status(201).json({
      message: " category by id ${id fetched",
      success: true,
      status: "success",
      data: category,
    });
  }
});

// update
export const update = asyncHandler(async (req: Request, res: Response) => {
  //get category id from params
  const { id } = req.params;
  // get body data to update
  const { name, description } = req.body;
  //find category by id
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  );
  if (!updatedCategory) {
    throw new CustomError("category not  to updated found", 400);

    res.status(201).json({
      message: " category updated",
      success: true,
      status: "success",
      data: updatedCategory,
    });
  }
});

//delete
export const remove = asyncHandler(async (req: Request, res: Response) => {
  //remove category id from params
  const { id } = req.params;

  await Category.findByIdAndDelete(id);
  res.status(200).json({
    message: "category deleted",
    success: true,
    status: "success",
    data: null,
  });
});
