"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("../controller/brand.controller");
//import { authenticate } from "../middleware/authenticate.middleware";
const authorize_middleware_1 = require("../middleware/authorize.middleware");
const global_types_1 = require("../types/global.types");
const router = express_1.default.Router();
router.post("/", (0, authorize_middleware_1.authorize)(global_types_1.onlyAdmin), brand_controller_1.createBrand);
router.get("/", brand_controller_1.getAllBrands);
router.get("/:id", brand_controller_1.getBrandById);
router.put("/:id", (0, authorize_middleware_1.authorize)(global_types_1.onlyAdmin), brand_controller_1.updateBrand);
router.delete("/:id", (0, authorize_middleware_1.authorize)(global_types_1.onlyAdmin), brand_controller_1.deleteBrand);
exports.default = router;
