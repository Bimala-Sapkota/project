import mongoose, { mongo } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { OrderStatus } from "../types/global.types";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user is required"],
      ref: "user",
    },
    orderId: {
      type: String,
      required: [true, "order id is required"],
      default: `ORD-${uuidv4().split("-")[0]}`,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
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
      enum: Object.values(OrderStatus),
      default: OrderStatus,
    },

    totalAmount: {
      type: Number,
      required: [true, "total amount is required"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
