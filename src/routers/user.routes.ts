import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  deleteAccount,
} from "../controller/user.controller";
import { authenticate } from "../middleware/authenticate.middleware";
import { onlyUser } from "../types/global.types";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authenticate(onlyUser), getProfile);
router.put("/profile", authenticate(onlyUser), updateProfile);
router.delete("/profile", authenticate(onlyUser), deleteAccount);

export default router;
