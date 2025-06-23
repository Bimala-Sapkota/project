import { login } from "./../controller/auth.controller";
import express from "express";
import { register } from "../controller/auth.controller";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
export default router;
