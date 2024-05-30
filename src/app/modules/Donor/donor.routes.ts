import express from "express";
import { donorControllers } from "./donor.controller";
import auth from "../../middlewares/auth";
import validateData from "../../middlewares/validateData";
import { donorValidation } from "./donor.validation";

const router = express.Router();

router.get("/donor-list", donorControllers.getAllDonor);
router.post(
  "/donation-request",
  auth(),
  validateData(donorValidation.requestDonorValidation),
  donorControllers.donationRequest
);
router.get("/donation-request", auth(), donorControllers.getMyDonationRequest);
router.put(
  "/donation-request/:requestId",
  auth(),
  validateData(donorValidation.updateRequestStatusValidation),
  donorControllers.updateRequestStatus
);
router.get("/donor/:donorId", donorControllers.getSingleDonor);

export const donorRoutes = router;
