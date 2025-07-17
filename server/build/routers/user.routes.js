"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const authenticate_middleware_1 = require("../middleware/authenticate.middleware");
const global_types_1 = require("../types/global.types");
const router = express_1.default.Router();
router.post("/register", user_controller_1.register);
router.post("/login", user_controller_1.login);
router.get("/profile", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyUser), user_controller_1.getProfile);
router.put("/profile", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyUser), user_controller_1.updateProfile);
router.delete("/profile", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyUser), user_controller_1.deleteAccount);
exports.default = router;
