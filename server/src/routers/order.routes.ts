import { onlyAdminAndUser } from "./../types/global.types";
import express from "express";
import { authenticate } from "../middleware/authenticate.middleware";
import { onlyAdmin, onlyUser } from "../types/global.types";
import {
  cancelOrder,
  create,
  getAllByUserId,
  getAllOrders,
  remove,
  updateStatus,
} from "../controller/order.controller";

const router = express.Router();

router.post("/", authenticate(onlyUser), create);
router.delete("/:id", authenticate(onlyAdmin), remove);

router.get("/user", authenticate(onlyUser), getAllByUserId);
router.get("/", authenticate(onlyAdmin), getAllOrders);
router.get("/:id", authenticate(onlyAdminAndUser), getAllByUserId);

router.put("/cancel/:id", authenticate(onlyUser), cancelOrder);

export default router;
