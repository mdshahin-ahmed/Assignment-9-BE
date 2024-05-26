"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorMessages = err.issues.map((issue) => issue.message);
    const concatMessages = errorMessages.join(" ");
    const issues = err.errors.map((e) => ({
        field: e.path[1],
        message: e.message,
    }));
    return {
        statusCode: 400,
        message: concatMessages,
        errorDetails: issues,
    };
};
exports.default = handleZodError;
