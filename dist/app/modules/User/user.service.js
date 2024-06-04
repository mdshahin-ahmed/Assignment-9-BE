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
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../../shared/prisma");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const client_1 = require("@prisma/client");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, bloodType, location, bio, createdAt, updatedAt, userStatus, } = payload;
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const userData = {
        name,
        email,
        password: hashedPassword,
        bloodType,
        location,
        createdAt,
        updatedAt,
        role: client_1.Role.USER,
        userStatus,
    };
    const profileData = {
        bio,
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
    }));
    return result;
});
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, bloodType, location, bio, createdAt, updatedAt, userStatus, } = payload;
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const userData = {
        name,
        email,
        password: hashedPassword,
        bloodType,
        location,
        createdAt,
        updatedAt,
        role: client_1.Role.ADMIN,
        userStatus,
    };
    const profileData = {
        bio,
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
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findMany();
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
    const result = yield prisma_1.prisma.user.update({
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
});
const updateUser = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield prisma_1.prisma.user.update({
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
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield prisma_1.prisma.user.findUnique({
        where: {
            id: user.id,
        },
    });
    if (!profile) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.oldPassword, profile.password);
    if (!isCorrectPassword) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Password incorrect!");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 12);
    const result = yield prisma_1.prisma.user.update({
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
});
exports.userService = {
    createUser,
    getUser,
    getMyProfile,
    updateMyProfile,
    createAdmin,
    changePassword,
    getUsers,
    updateUser,
};
