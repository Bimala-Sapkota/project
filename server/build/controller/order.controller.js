"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.updateStatus = exports.getById = exports.remove = exports.getAllByUserId = exports.getAllOrders = exports.create = void 0;
const error_handler_middleware_1 = require("../middleware/error-handler.middleware");
const order_model_1 = __importDefault(require("../models/order.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const global_types_1 = require("../types/global.types");
const async_handler_utils_1 = require("../utils/async-handler.utils");
const nodemailer_utils_1 = require("../utils/nodemailer.utils");
const html_utils_1 = require("../utils/html.utils");
//import { StatusCodes } from "http-status-codes";
exports.create = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: user, email } = req.user;
    const { items } = req.body;
    const orderItems = JSON.parse(items);
    const orderProducts = orderItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.default.findById(item.product);
        if (!product) {
            return null;
        }
        return {
            product: product._id,
            quantity: item.quantity,
            totalPrice: product.price * item.quantity,
        };
    }));
    const products = yield Promise.all(orderProducts);
    const filteredItems = products.filter((item) => item !== null);
    const totalAmount = filteredItems
        .reduce((acc, item) => {
        return (acc += item === null || item === void 0 ? void 0 : item.totalPrice);
    }, 0)
        .toFixed(2);
    const order = new order_model_1.default({ user, items: filteredItems, totalAmount });
    const newOrder = yield (yield order.save()).populate("items.product");
    yield (0, nodemailer_utils_1.sendMail)({
        to: email,
        subject: "Order Placed Successfully",
        html: (0, html_utils_1.order_confirmation_html)(newOrder.items, Number(totalAmount)),
    });
    res.status(201).json({
        message: "Order placed successfully",
        success: true,
        status: "success",
        data: newOrder,
    });
}));
//get all order (only Admin)
exports.getAllOrders = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allOrders = yield order_model_1.default.find()
        .populate("user", "-password")
        .populate("items.product")
        .sort({ createdAt: -1 });
    res.status(201).json({
        message: "all order fetched",
        success: true,
        status: "success",
        data: allOrders,
    });
}));
// get all order for user(only user)
exports.getAllByUserId = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const allOrders = yield order_model_1.default.find({ user })
        .populate("user", "-password")
        .populate("items.product")
        .sort({ createdAt: -1 });
    res.status(201).json({
        message: "all order fetched",
        success: true,
        status: "success",
        data: allOrders,
    });
}));
// delete order (admin,user)
exports.remove = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const deletedOrder = yield order_model_1.default.findByIdAndDelete(orderId);
    if (!deletedOrder) {
        throw new error_handler_middleware_1.CustomError("order not found", 400);
    }
    res.status(201).json({
        message: "Order Deleted Successfully",
        success: true,
        status: "success",
        data: deletedOrder,
    });
}));
//get order by id(user,admin)
exports.getById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const order = yield order_model_1.default.find({ orderId })
        .populate("user", "-password")
        .populate("items.product");
    res.status(200).json({
        message: " order fetched",
        success: true,
        status: "success",
        data: order,
    });
}));
// update status
exports.updateStatus = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        throw new error_handler_middleware_1.CustomError("status is required", 400);
    }
    const order = yield order_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
        throw new error_handler_middleware_1.CustomError("order not found", 400);
    }
    res.status(200).json({
        message: " order status updated",
        success: true,
        status: "success",
        data: order,
    });
}));
// cancel order (user)
exports.cancelOrder = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { id } = req.params;
    // find order
    const order = yield order_model_1.default.findById({ _id: id, user: userId });
    if (!order) {
        throw new error_handler_middleware_1.CustomError("Order not found or you are not authorized", 404);
    }
    // optionally: check if order is already delivered (cannot cancel delivered orders)
    if (order.status === "Delivered") {
        throw new error_handler_middleware_1.CustomError("Cannot cancel a delivered order", 400);
    }
    // update status
    order.status = global_types_1.OrderStatus.CANCELED;
    yield order.save();
    res.status(200).json({
        message: "Order cancelled successfully",
        success: true,
        status: "success",
        data: order,
    });
}));
