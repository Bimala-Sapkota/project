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
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const async_handler_utils_1 = require("../utils/async-handler.utils");
const product_model_1 = __importDefault(require("../models/product.model"));
const error_handler_middleware_1 = __importDefault(require("../middleware/error-handler.middleware"));
const path_1 = __importDefault(require("path"));
const pagination_utils_1 = require("../utils/pagination.utils");
exports.create = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { coverImage, images } = req.files;
    console.log(coverImage);
    if (!coverImage || coverImage.length === 0) {
        throw new error_handler_middleware_1.default("coverImage is required", 404);
    }
    const product = new product_model_1.default(data);
    product.coverImage = {
        path: coverImage[0].path,
        public_id: path_1.default.basename(coverImage[0].path),
    };
    if (images && images.length > 0) {
        const imagePath = images.map((image) => ({
            path: image.path,
            public_id: path_1.default.basename(image.path),
        }));
        product.images = imagePath;
    }
    yield product.save();
    res.status(201).json({
        status: "success",
        success: true,
        message: "Product created successfully",
        data: product,
    });
}));
exports.getAll = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { query, minPrice, maxPrice, limit, page } = req.query;
    const filter = {};
    console.log(query);
    //pagination
    const perPage = (_a = parseInt(limit)) !== null && _a !== void 0 ? _a : 10;
    const currentPage = (_b = parseInt(page)) !== null && _b !== void 0 ? _b : 1;
    //calculate skip
    const skip = (currentPage - 1) * perPage;
    if (query) {
        filter.$or = [
            {
                name: {
                    $regex: query, // regex is used for patron match
                    $options: "i", // hami le patako product ko auta matra word correct vayo vane vslu dekaune
                },
            },
            {
                descritiop: {
                    $regex: query,
                    $options: "i",
                },
            },
        ];
    }
    if (minPrice || maxPrice) {
        if (minPrice && maxPrice) {
            filter.price = {
                $lte: Number(maxPrice),
                $gte: Number(minPrice),
            };
        }
        if (minPrice) {
            filter.price = {
                $gte: Number(minPrice),
            };
        }
        if (maxPrice) {
            filter.price = {
                $lte: Number(maxPrice),
            };
        }
    }
    const products = yield product_model_1.default.find(filter)
        .limit(perPage)
        .skip(skip)
        .sort({ createdAt: -1 })
        .populate("category");
    const totalData = yield product_model_1.default.countDocuments(filter);
    const pagination = (0, pagination_utils_1.getPagination)(totalData, perPage, currentPage);
    res.status(200).json({
        status: "success",
        success: true,
        message: "Products fetched successfully",
        data: {
            data: products,
            pagination,
        },
    });
}));
exports.getById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_model_1.default.findOne({ _id: id }).populate("category");
    if (!product) {
        throw new error_handler_middleware_1.default("Product not found", 404);
    }
    res.status(200).json({
        status: "success",
        success: true,
        message: "Product fetched successfully",
        data: product,
    });
}));
exports.update = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const product = yield product_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!product) {
        throw new error_handler_middleware_1.default("Product not found", 404);
    }
    res.status(200).json({
        status: "success",
        success: true,
        message: "Product updated successfully",
        data: product,
    });
}));
exports.remove = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_model_1.default.findByIdAndDelete(id);
    if (!product) {
        throw new error_handler_middleware_1.default("Product not found", 404);
    }
    res.status(200).json({
        status: "success",
        success: true,
        message: "Product deleted successfully",
        data: null,
    });
}));
