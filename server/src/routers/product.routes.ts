import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controller/product.controller";
import { authenticate } from "../middleware/authenticate.middleware";
import { onlyAdmin } from "../types/global.types";

import { uploader } from "../middleware/file_uploder.middelware";

const upload = uploader();

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post(
  "/",
  authenticate(onlyAdmin),
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  create
);

router.put("/:id", authenticate(onlyAdmin), update);

router.delete("/:id", authenticate(onlyAdmin), remove);

export default router;
