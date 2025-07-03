import express from "express";
import { create } from "../controller/product.controller";
import { authenticate } from "../middleware/authenticate.middleware";
import { onlyUser } from "../types/global.types";
const router = express.Router();

router.post("/", authenticate(onlyUser), create);

export default router;
