"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateData_1 = __importDefault(require("../../middlewares/validateData"));
const user_validation_1 = require("../User/user.validation");
const router = express_1.default.Router();
router.post("/login", (0, validateData_1.default)(user_validation_1.userValidation.loginUserValidation), auth_controller_1.authControllers.loginUser);
exports.authRoutes = router;
