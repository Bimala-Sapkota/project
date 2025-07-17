"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getall = exports.clear = exports.create = void 0;
const error_handler_middleware_1 = require("./../middleware/error-handler.middleware");
const async_handler_utils_1 = require("../utils/async-handler.utils");
const product_model_1 = __importDefault(require("../models/product.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.create = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { productId } = req.body;
    if (!productId) {
        throw new error_handler_middleware_1.CustomError("product id is required", 400);
    }
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new error_handler_middleware_1.CustomError("product not found", 404);
    }
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.CustomError("user not found", 404);
    }
    const isProductAlreadyExists = user.wishlist.find((wishlistProduct) => wishlistProduct.toString() === product._id.toString());
    console.log(isProductAlreadyExists);
    if (isProductAlreadyExists) {
        user.wishlist = user.wishlist.filter((wishlistProduct) => wishlistProduct.toString() !== product._id.toString());
    }
    else {
        user.wishlist.push(product._id);
    }
    yield user.save();
    res.status(201).json({
        message: `${isProductAlreadyExists ? "Removed from" : "Added to"} wishlist`,
        status: "success",
        success: true,
        data: user.wishlist,
    });
}));
exports.clear = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.CustomError("user not found", 404);
    }
    user.wishlist = [];
    yield user.save();
    res.status(200).json({
        message: `wishlist cleared`,
        status: "success",
        success: true,
        data: null,
    });
}));
// get wishlist
exports.getall = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.CustomError("user not found", 404);
    }
    user.wishlist = [];
    yield user.save();
    res.status(200).json({
        message: `wishlist cleared`,
        status: "success",
        success: true,
        data: null,
    });
}));
// get by id
exports.getById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { productId } = req.params; // Assuming the product ID is passed as a URL parameter
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.CustomError("user not found", 404);
    }
    // Check if the product is in the user's wishlist
    const productInWishlist = user.wishlist.find((wishlistProduct) => wishlistProduct.toString() === productId);
    if (!productInWishlist) {
        throw new error_handler_middleware_1.CustomError("product not found in wishlist", 404);
    }
    // Optionally, you can retrieve the product details if needed
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new error_handler_middleware_1.CustomError("product not found", 404);
    }
    res.status(200).json({
        message: "Product found in wishlist",
        status: "success",
        success: true,
        data: product,
    });
}));
