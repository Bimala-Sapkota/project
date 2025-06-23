import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controller/category.controller";
import { authenticate } from "../middleware/authenticate.middleware";

const router = express.Router();
//category post route
router.post("/", authenticate(), create);
// get all, category
router.get("/", getAll);
//get id by category
router.get("/:id", getById);
//update
router.put("/:id", update);
//delete
router.delete("./:id", remove);

export default router;
