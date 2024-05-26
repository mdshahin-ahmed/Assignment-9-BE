import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
import { donorRoutes } from "../modules/Donor/donor.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "",
    route: userRoutes,
  },
  {
    path: "",
    route: authRoutes,
  },
  {
    path: "",
    route: donorRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
