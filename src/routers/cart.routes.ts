import express from "express";
import { clear, create, getCart } from "../controller/cart.controller";
import { authenticate } from "../middleware/authenticate.middleware";
import { onlyUser } from "../types/global.types";

const router = express.Router();

router.post("/", authenticate(onlyUser), create);
router.get("/", authenticate(onlyUser), getCart);
router.post("/clear", authenticate(onlyUser), clear);

export default router;
