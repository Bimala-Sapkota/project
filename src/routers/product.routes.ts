import { uploader } from "./../middleware/file_uploder.middelware";
import express from "express";
import {
  create,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller";
import { authenticate } from "../middleware/authenticate.middleware";
import { onlyAdmin, onlyUser } from "../types/global.types";

const router = express.Router();
const upload = uploader();

router.get("/", getAllProducts);

//POST route for creating a product with file uploads
router.post(
  "/",
  authenticate(onlyAdmin), // Ensure only admin can create products
  upload.fields([
    { name: "coverImage", maxCount: 1 }, // Use 'maxCount' (lowercase)
    { name: "image", maxCount: 5 },
  ]),
  create // Call the createProduct controller after file upload
);

router.get("/:id", getProductById);
router.put("/:id", authenticate(onlyAdmin), updateProduct);
router.delete("/:id", authenticate(onlyAdmin), deleteProduct);

export default router;
