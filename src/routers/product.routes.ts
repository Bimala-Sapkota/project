import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller";
import { authenticate } from "../middleware/authenticate.middleware";

const router = express.Router();

router.post("/", authenticate(), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", authenticate(), updateProduct);
router.delete("/:id", authenticate(), deleteProduct);

export default router;
