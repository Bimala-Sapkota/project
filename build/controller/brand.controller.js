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
exports.deleteBrand = exports.updateBrand = exports.getBrandById = exports.getAllBrands = exports.createBrand = void 0;
const brand_model_1 = __importDefault(require("../models/brand.model"));
const async_handler_utils_1 = require("../utils/async-handler.utils");
const error_handler_middleware_1 = require("../middleware/error-handler.middleware");
// create brand(post)
exports.createBrand = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const brandExists = yield brand_model_1.default.findOne({ name });
    if (brandExists) {
        throw new error_handler_middleware_1.CustomError("Brand already exists", 400);
    }
    const brand = yield brand_model_1.default.create({ name, description });
    res.status(201).json({
        message: "Brand created successfully",
        success: true,
        data: brand,
    });
}));
// get all brands(get)
exports.getAllBrands = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, query } = req.query;
    // Create filter object with $or and $and conditions
    const filter = {};
    if (query) {
        // General search that looks in both name and description
        filter.$or = [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
        ];
    }
    else {
        // Specific field filters if no general query is present
        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }
        if (description) {
            filter.description = { $regex: description, $options: "i" };
        }
    }
    // Add additional filters here if needed (like status, etc.)
    // if (status) {
    //   filter.status = status;
    // }
    // Fetch brands based on the filter
    const brands = yield brand_model_1.default.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
        message: "Brands fetched successfully",
        success: true,
        data: brands,
    });
}));
// get single brand by id (get)
exports.getBrandById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = yield brand_model_1.default.findById(req.params.id);
    if (!brand) {
        throw new error_handler_middleware_1.CustomError("Brand not found", 404);
    }
    res.status(200).json({
        message: "Brand fetched successfully",
        success: true,
        data: brand,
    });
}));
// update brand(post)
exports.updateBrand = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const brand = yield brand_model_1.default.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    if (!brand) {
        throw new error_handler_middleware_1.CustomError("Brand not found", 404);
    }
    res.status(200).json({
        message: "Brand updated successfully",
        success: true,
        data: brand,
    });
}));
// delete brand (delete)
exports.deleteBrand = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBrand = yield brand_model_1.default.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
        throw new error_handler_middleware_1.CustomError("Brand not found", 404);
    }
    res.status(200).json({
        message: "Brand deleted successfully",
        success: true,
        data: deletedBrand,
    });
}));
