import express from "express";
import { authControllers } from "./auth.controller";
import validateData from "../../middlewares/validateData";
import { userValidation } from "../User/user.validation";

const router = express.Router();

router.post(
  "/login",
  validateData(userValidation.loginUserValidation),
  authControllers.loginUser
);

export const authRoutes = router;
