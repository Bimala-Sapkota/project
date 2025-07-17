import express from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controller/brand.controller";
//import { authenticate } from "../middleware/authenticate.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { onlyAdmin } from "../types/global.types";

const router = express.Router();

router.post("/", authorize(onlyAdmin), createBrand);
router.get("/", getAllBrands);
router.get("/:id", getBrandById);
router.put("/:id", authorize(onlyAdmin), updateBrand);
router.delete("/:id", authorize(onlyAdmin), deleteBrand);

export default router;
