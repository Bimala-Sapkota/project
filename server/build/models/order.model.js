"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const global_types_1 = require("../types/global.types");
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "user is required"],
        ref: "user",
    },
    orderId: {
        type: String,
        required: [true, "order id is required"],
        default: `ORD-${(0, uuid_1.v4)().split("-")[0]}`,
    },
    items: [
        {
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: [true, "product is required"],
                ref: "product",
            },
            quantity: {
                type: Number,
                required: [true, "quantity is required"],
            },
        },
    ],
    status: {
        type: String,
        enum: Object.values(global_types_1.OrderStatus),
        default: global_types_1.OrderStatus,
    },
    totalAmount: {
        type: Number,
        required: [true, "total amount is required"],
    },
}, { timestamps: true });
const Order = mongoose_1.default.model("order", orderSchema);
exports.default = Order;
