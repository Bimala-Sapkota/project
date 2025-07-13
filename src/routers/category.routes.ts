import express from "express";
import { authenticate } from "../middleware/authenticate.middleware";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controller/category.controller";
import { Role } from "../types/global.types";

const router = express.Router();

// /category

// category post route
router.post("/", authenticate([Role.ADMIN]), create);

// get all categories
router.get("/", authenticate(), getAll);

// get by id
router.get("/:id", getById);

// update category
router.put("/:id", authenticate([Role.ADMIN]), update);

// delete
router.delete("/:id", authenticate([Role.ADMIN]), remove);

export default router;
