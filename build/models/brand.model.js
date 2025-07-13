"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const brandSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "brand name is required"],
        unique: true,
        trim: true,
    },
    logo: {
        path: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    description: {
        type: String,
        trim: true,
    },
}, { timestamps: true });
const Brand = mongoose_1.default.model("brand", brandSchema);
exports.default = Brand;
