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
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_conflict_1 = __importDefault(require("../config/cloudinary.conflict."));
const uploader = () => {
    const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
        cloudinary: cloudinary_conflict_1.default,
        params: () => __awaiter(void 0, void 0, void 0, function* () {
            return {
                folder: "shop-kart",
                allowed_format: ["jpg", "jpeg", "webp", "png", "avif", "pdf"],
            };
        }),
    });
    const upload = (0, multer_1.default)({ storage });
    return upload;
};
exports.uploader = uploader;
