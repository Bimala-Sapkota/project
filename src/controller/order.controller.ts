import { CustomError } from "./../middleware/error-handler.middleware";
import Order from "../models/order.model";
import Product from "../models/product.model";
import { asyncHandler } from "../utils/async-handler.utils";
import { Request, Response } from "express";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user._id;
  const { items } = req.body;

  const orderItems: { product: string; quantity: number }[] = JSON.parse(items);

  const orderProducts = orderItems.map(async (item) => {
    const product = await Product.findById(item.product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return {
      product: product._id,
      quantity: item.quantity,
      totalPrice: product.price * item.quantity,
    };
  });

  const products = await Promise.all(orderProducts);

  const filterItems = products.filter((item) => item !== null);

  const totalAmount = filterItems
    .reduce((acc, item) => {
      return (acc += item?.totalPrice);
    }, 0)
    .toFixed(2);

  const order = new Order({ user, items: filterItems, totalAmount });

  const newOrder = await (await order.save()).populate("items.product");

  res.status(201).json({
    message: "Order created successfully",
    success: true,
    status: "success",
    data: newOrder,
  });
});

//get all order (only Admin)

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const allOrders = await Order.find()
      .populate("user", "-password")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(201).json({
      message: "all order fetched",
      success: true,
      status: "success",
      data: allOrders,
    });
  }
);

// get all order for user(only user)
export const getAllByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user._id;
    const allOrders = await Order.find({ user })
      .populate("user", "-password")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(201).json({
      message: "all order fetched",
      success: true,
      status: "success",
      data: allOrders,
    });
  }
);

// delete order (admin,user)

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const deletedOrder = await Order.findByIdAndDelete(orderId);

  if (!deletedOrder) {
    throw new CustomError("order not found", 400);
  }
  res.status(201).json({
    message: "Order Deleted Successfully",
    success: true,
    status: "success",
    data: deletedOrder,
  });
});

//get order by id(user,admin)
export const getById = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const order = await Order.find({ orderId })
    .populate("user", "-password")
    .populate("items.product");

  res.status(200).json({
    message: " order fetched",
    success: true,
    status: "success",
    data: order,
  });
});
