import { Prisma, Status } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { userSearchAbleFields } from "./donor.constant";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const getAllDonor = async (params: any, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);

  if (params.availability === "false") {
    params.availability = false;
  }
  if (params.availability === "true") {
    params.availability = true;
  }

  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const sortArr: any[] = [];

  if (options.sortBy === "name") {
    sortArr.push({ name: options.sortOrder });
  } else if (
    options.sortBy === "age" ||
    options.sortBy === "lastDonationDate"
  ) {
    sortArr.push({
      userProfile: {
        [options.sortBy]: options.sortOrder,
      },
    });
  }

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy: sortArr,
    select: {
      id: true,
      name: true,
      email: true,
      bloodType: true,
      location: true,
      availability: true,
      createdAt: true,
      updatedAt: true,
      userProfile: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const donationRequest = async (params: any, user: any) => {
  const donor = await prisma.user.findUnique({
    where: {
      id: params.donorId,
    },
  });
  if (!donor) {
    throw new ApiError(httpStatus.NOT_FOUND, "Donor not found");
  }

  const result = await prisma.request.create({
    data: {
      ...params,
      requesterId: user.id,
    },
    select: {
      id: true,
      donorId: true,
      phoneNumber: true,
      dateOfDonation: true,
      hospitalName: true,
      hospitalAddress: true,
      reason: true,
      requestStatus: true,
      createdAt: true,
      updatedAt: true,
      donor: {
        select: {
          id: true,
          name: true,
          email: true,
          bloodType: true,
          location: true,
          availability: true,
          createdAt: true,
          updatedAt: true,
          userProfile: true,
        },
      },
    },
  });
  return result;
};

const getMyDonationRequest = async (user: any) => {
  const result = await prisma.request.findMany({
    where: {
      donorId: user.id,
    },
    select: {
      id: true,
      donorId: true,
      requesterId: true,
      phoneNumber: true,
      dateOfDonation: true,
      hospitalName: true,
      hospitalAddress: true,
      reason: true,
      requestStatus: true,
      createdAt: true,
      updatedAt: true,
      requester: {
        select: {
          id: true,
          name: true,
          email: true,
          location: true,
          bloodType: true,
          availability: true,
        },
      },
    },
  });
  return result;
};
const updateRequestStatus = async (
  id: any,
  payload: { requestStatus: Status }
) => {
  const request = await prisma.request.findUnique({
    where: {
      id: id,
    },
  });
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, "Request not found");
  }

  const result = await prisma.request.update({
    where: {
      id: id,
    },
    data: {
      requestStatus: payload.requestStatus,
    },
  });

  return result;
};

export const donorServices = {
  getAllDonor,
  donationRequest,
  getMyDonationRequest,
  updateRequestStatus,
};
