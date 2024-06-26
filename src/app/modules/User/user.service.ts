import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { Role } from "@prisma/client";

type TUser = {
  name: string;
  email: string;
  password: string;
  bloodType:
    | "A_POSITIVE"
    | "A_NEGATIVE"
    | "B_POSITIVE"
    | "B_NEGATIVE"
    | "AB_POSITIVE"
    | "AB_NEGATIVE"
    | "O_POSITIVE"
    | "O_NEGATIVE";
  location: string;
  bio: string;
  lastDonationDate: string;
  createdAt: string;
  updatedAt: string;
  userStatus: "ACTIVATE" | "DEACTIVATE";
};

const createUser = async (payload: TUser) => {
  const {
    name,
    email,
    password,
    bloodType,
    location,
    bio,
    createdAt,
    updatedAt,
    userStatus,
  } = payload;

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const userData = {
    name,
    email,
    password: hashedPassword,
    bloodType,
    location,
    createdAt,
    updatedAt,
    role: Role.USER,
    userStatus,
  };

  const profileData = {
    bio,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const user = await transactionClient.user.create({
      data: userData,
    });

    const profile = await transactionClient.userProfile.create({
      data: { ...profileData, userId: user.id } as any,
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bloodType: user.bloodType,
      location: user.location,
      availability: user.availability,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
      userStatus: user.userStatus,
      userProfile: {
        id: profile.id,
        userId: profile.userId,
        bio: profile.bio,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    };
  });

  return result;
};
const createAdmin = async (payload: TUser) => {
  const {
    name,
    email,
    password,
    bloodType,
    location,
    bio,
    createdAt,
    updatedAt,
    userStatus,
  } = payload;

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const userData = {
    name,
    email,
    password: hashedPassword,
    bloodType,
    location,
    createdAt,
    updatedAt,
    role: Role.ADMIN,
    userStatus,
  };

  const profileData = {
    bio,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const user = await transactionClient.user.create({
      data: userData,
    });

    const profile = await transactionClient.userProfile.create({
      data: { ...profileData, userId: user.id } as any,
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bloodType: user.bloodType,
      location: user.location,
      availability: user.availability,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
      userStatus: user.userStatus,
      userProfile: {
        id: profile.id,
        userId: profile.userId,
        bio: profile.bio,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    };
  });

  return result;
};

const getUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const getMyProfile = async (user: any) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
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

  return result;
};
const getUsers = async () => {
  const result = await prisma.user.findMany();

  return result;
};
const updateMyProfile = async (user: any, payload: any) => {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Profile not found");
  }

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: payload,
  });

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    bloodType: result.bloodType,
    location: result.location,
    availability: result.availability,
    role: result.role,
    userStatus: result.userStatus,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
};
const updateUser = async (userId: any, payload: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payload,
  });

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    bloodType: result.bloodType,
    location: result.location,
    availability: result.availability,
    role: result.role,
    userStatus: result.userStatus,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
};

const changePassword = async (user: any, payload: any) => {
  const profile = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    profile.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.NOT_FOUND, "Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: { password: hashedPassword },
  });

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    bloodType: result.bloodType,
    location: result.location,
    availability: result.availability,
    role: result.role,
    userStatus: result.userStatus,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
};

export const userService = {
  createUser,
  getUser,
  getMyProfile,
  updateMyProfile,
  createAdmin,
  changePassword,
  getUsers,
  updateUser,
};
