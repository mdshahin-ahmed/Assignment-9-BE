import express from "express";
import validateData from "../../middlewares/validateData";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { userValidation } from "./user.validation";

const userRoute = express.Router();

userRoute.post(
  "/register",
  validateData(userValidation.registerUserValidation),
  userController.createUser
);
userRoute.post(
  "/register-admin",
  validateData(userValidation.registerUserValidation),
  userController.createAdmin
);
userRoute.get("/user", userController.getUser);

userRoute.get("/my-profile", auth(), userController.getMyProfile);

userRoute.put("/my-profile", auth(), userController.updateMyProfile);
userRoute.put("/change-password", auth(), userController.changePassword);

export const userRoutes = userRoute;
