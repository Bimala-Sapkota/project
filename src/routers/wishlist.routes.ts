import express from "express";
import { create } from "../controller/product.controller";
import { authenticate } from "../middleware/authenticate.middleware";
import { onlyUser } from "../types/global.types";
import { clear, getById } from "../controller/wishlist.controller";

const router = express.Router();

router.post("/", authenticate(onlyUser), create);
router.post("/", authenticate(onlyUser), clear);

router.get("/wishlist/:productId", getById);

export default router;
