"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const error_handler_middleware_1 = require("./error-handler.middleware");
const authorize = (allowedRoles) => (req, res, next) => {
    const user = req.user;
    if (!user) {
        throw new error_handler_middleware_1.CustomError("Unauthorized: user not found", 401);
    }
    if (!allowedRoles.includes(user.role)) {
        throw new error_handler_middleware_1.CustomError("Forbidden: you do not have permission", 403);
    }
    next();
};
exports.authorize = authorize;
