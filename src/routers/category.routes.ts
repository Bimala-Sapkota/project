import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controller/category.controller";
import { authenticate } from "../middleware/authenticate.middleware";
import { onlyAdmin, Role } from "../types/global.types";

const router = express.Router();
//category post route
router.post("/", create);
// get all, category
router.get("/", authenticate(), getAll);
//get id by category
router.get("/:id", getById);
//update
router.put("/:id", authenticate([Role.ADMIN]), update);
//delete
router.delete("/:id", authenticate([Role.ADMIN]), remove);

export default router;
