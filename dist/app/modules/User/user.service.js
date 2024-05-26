"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../../shared/prisma");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, bloodType, location, age, bio, lastDonationDate, createdAt, updatedAt, } = payload;
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const userData = {
        name,
        email,
        password: hashedPassword,
        bloodType,
        location,
        createdAt,
        updatedAt,
    };
    const profileData = {
        bio,
        age,
        lastDonationDate,
    };
    const result = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.create({
            data: userData,
        });
        const profile = yield transactionClient.userProfile.create({
            data: Object.assign(Object.assign({}, profileData), { userId: user.id }),
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
            userProfile: {
                id: profile.id,
                userId: profile.userId,
                bio: profile.bio,
                age: profile.age,
                lastDonationDate: profile.lastDonationDate,
                createdAt: profile.createdAt,
                updatedAt: profile.updatedAt,
            },
        };
    }));
    return result;
});
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findMany();
    return result;
});
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findUniqueOrThrow({
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
});
const updateMyProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield prisma_1.prisma.userProfile.findUnique({
        where: {
            userId: user.id,
        },
    });
    if (!profile) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Profile not found");
    }
    const result = yield prisma_1.prisma.userProfile.update({
        where: {
            userId: user.id,
        },
        data: payload,
    });
    return result;
});
exports.userService = {
    createUser,
    getUser,
    getMyProfile,
    updateMyProfile,
};
