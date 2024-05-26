"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateData_1 = __importDefault(require("../../middlewares/validateData"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_validation_1 = require("./user.validation");
const userRoute = express_1.default.Router();
userRoute.post("/register", (0, validateData_1.default)(user_validation_1.userValidation.registerUserValidation), user_controller_1.userController.createUser);
userRoute.get("/user", user_controller_1.userController.getUser);
userRoute.get("/my-profile", (0, auth_1.default)(), user_controller_1.userController.getMyProfile);
userRoute.put("/my-profile", (0, auth_1.default)(), user_controller_1.userController.updateMyProfile);
exports.userRoutes = userRoute;
