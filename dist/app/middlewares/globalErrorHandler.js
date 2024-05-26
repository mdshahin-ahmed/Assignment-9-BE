"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const globalErrorHandler = (err, req, res, next) => {
    const defaultValues = {
        statusCode: 500,
        message: "Something went wrong!",
        errorDetails: {} || null,
    };
    if (err instanceof zod_1.ZodError) {
        const error = (0, handleZodError_1.default)(err);
        defaultValues.statusCode = error.statusCode;
        defaultValues.message = error.message;
        defaultValues.errorDetails = error.errorDetails;
    }
    else if (err instanceof ApiError_1.default) {
        defaultValues.message = err.message;
        defaultValues.statusCode = err.statusCode;
        defaultValues.errorDetails = null;
    }
    return res.status(defaultValues.statusCode).json({
        success: false,
        message: defaultValues.message,
        errorDetails: defaultValues.errorDetails,
    });
};
exports.globalErrorHandler = globalErrorHandler;
