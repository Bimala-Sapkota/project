import { CustomError } from "../middleware/error-handler.middleware";
import Order from "../models/order.model";
import Product from "../models/product.model";
import { OrderStatus } from "../types/global.types";
import { asyncHandler } from "../utils/async-handler.utils";
import { Request, Response } from "express";
//import { StatusCodes } from "http-status-codes";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user._id;
  const { items } = req.body;

  const orderItems: { product: string; quantity: number }[] = JSON.parse(items);

  const orderProducts = orderItems.map(async (item) => {
    const product = await Product.findById(item.product);

    if (!product) {
      return null;
    }

    return {
      product: product._id,
      quantity: item.quantity,
      totalPrice: product.price * item.quantity,
    };
  });

  const products = await Promise.all(orderProducts);

  const filteredItems = products.filter((item) => item !== null);

  const totalAmount = filteredItems
    .reduce((acc, item) => {
      return (acc += item?.totalPrice);
    }, 0)
    .toFixed(2);

  const order = new Order({ user, items: filteredItems, totalAmount });

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

// update status

export const updateStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      throw new CustomError("status is required", 400);
    }
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      throw new CustomError("order not found", 400);
    }
    res.status(200).json({
      message: " order status updated",
      success: true,
      status: "success",
      data: order,
    });
  }
);

// cancel order (user)
export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { id } = req.params;

  // find order
  const order = await Order.findById({ _id: id, user: userId });

  if (!order) {
    throw new CustomError("Order not found or you are not authorized", 404);
  }

  // optionally: check if order is already delivered (cannot cancel delivered orders)
  if (order.status === "Delivered") {
    throw new CustomError("Cannot cancel a delivered order", 400);
  }

  // update status
  order.status = OrderStatus.CANCELED;
  await order.save();

  res.status(200).json({
    message: "Order cancelled successfully",
    success: true,
    status: "success",
    data: order,
  });
});
