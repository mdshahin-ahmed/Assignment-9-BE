"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const donor_controller_1 = require("./donor.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateData_1 = __importDefault(require("../../middlewares/validateData"));
const donor_validation_1 = require("./donor.validation");
const router = express_1.default.Router();
router.get("/donor-list", donor_controller_1.donorControllers.getAllDonor);
router.post("/donation-request", (0, auth_1.default)(), (0, validateData_1.default)(donor_validation_1.donorValidation.requestDonorValidation), donor_controller_1.donorControllers.donationRequest);
router.get("/donation-request", (0, auth_1.default)(), donor_controller_1.donorControllers.getMyDonationRequest);
// analytics
router.get("/analytics", donor_controller_1.donorControllers.getAnalytics);
router.get("/blood-request", (0, auth_1.default)(), donor_controller_1.donorControllers.getMyBloodRequest);
router.put("/donation-request/:requestId", (0, auth_1.default)(), (0, validateData_1.default)(donor_validation_1.donorValidation.updateRequestStatusValidation), donor_controller_1.donorControllers.updateRequestStatus);
router.get("/donor/:donorId", donor_controller_1.donorControllers.getSingleDonor);
exports.donorRoutes = router;
