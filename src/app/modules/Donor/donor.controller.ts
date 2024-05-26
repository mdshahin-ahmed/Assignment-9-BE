import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { donorServices } from "./donor.service";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./donor.constant";

const getAllDonor = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await donorServices.getAllDonor(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donors successfully found",
    data: result,
  });
});

const donationRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = req.body;
    const user = req.user;
    const result = await donorServices.donationRequest(data, user);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Request successfully made",
      data: result,
    });
  }
);
const getMyDonationRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await donorServices.getMyDonationRequest(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation requests retrieved successfully",
      data: result,
    });
  }
);

const updateRequestStatus = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { requestId } = req.params;
    const result = await donorServices.updateRequestStatus(requestId, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation request status successfully updated",
      data: result,
    });
  }
);

export const donorControllers = {
  getAllDonor,
  donationRequest,
  getMyDonationRequest,
  updateRequestStatus,
};
