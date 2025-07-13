"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const authenticate_middleware_1 = require("../middleware/authenticate.middleware");
const global_types_1 = require("../types/global.types");
const wishlist_controller_1 = require("../controller/wishlist.controller");
const router = express_1.default.Router();
router.post("/", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyUser), product_controller_1.create);
router.post("/", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyUser), wishlist_controller_1.clear);
router.get("/wishlist/:productId", wishlist_controller_1.getById);
exports.default = router;
