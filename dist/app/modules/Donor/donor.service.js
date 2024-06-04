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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const donor_constant_1 = require("./donor.constant");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const getAllDonor = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    if (params.availability === "false") {
        params.availability = false;
    }
    if (params.availability === "true") {
        params.availability = true;
    }
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: donor_constant_1.userSearchAbleFields.map((field) => ({
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
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const sortArr = [];
    if (options.sortBy === "name") {
        sortArr.push({ name: options.sortOrder });
    }
    else if (options.sortBy === "age" ||
        options.sortBy === "lastDonationDate") {
        sortArr.push({
            userProfile: {
                [options.sortBy]: options.sortOrder,
            },
        });
    }
    const result = yield prisma_1.prisma.user.findMany({
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
    const total = yield prisma_1.prisma.user.count({
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
});
const donationRequest = (params, user) => __awaiter(void 0, void 0, void 0, function* () {
    const donor = yield prisma_1.prisma.user.findUnique({
        where: {
            id: params.donorId,
        },
    });
    if (!donor) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Donor not found");
    }
    const result = yield prisma_1.prisma.request.create({
        data: Object.assign(Object.assign({}, params), { requesterId: user.id }),
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
            termsAndCondition: true,
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
});
const getMyDonationRequest = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.request.findMany({
        where: {
            donorId: user.id,
        },
        select: {
            id: true,
            donorId: true,
            requesterId: true,
            hospitalName: true,
            hospitalAddress: true,
            reason: true,
            requestStatus: true,
            createdAt: true,
            updatedAt: true,
            phoneNumber: true,
            donor: {
                select: {
                    bloodType: true,
                },
            },
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
});
const getMyBloodRequest = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.request.findMany({
        where: {
            requesterId: user.id,
        },
        select: {
            id: true,
            donorId: true,
            requesterId: true,
            requestStatus: true,
            donor: {
                select: {
                    name: true,
                    email: true,
                    bloodType: true,
                },
            },
        },
    });
    return result;
});
const updateRequestStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const request = yield prisma_1.prisma.request.findUnique({
        where: {
            id: id,
        },
    });
    if (!request) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Request not found");
    }
    const result = yield prisma_1.prisma.request.update({
        where: {
            id: id,
        },
        data: {
            requestStatus: payload.requestStatus,
        },
    });
    return result;
});
const getSingleDonor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield prisma_1.prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            bloodType: true,
            location: true,
            availability: true,
            role: true,
            userStatus: true,
            createdAt: true,
            updatedAt: true,
            userProfile: true,
        },
    });
    if (!request) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Donor not found");
    }
    return request;
});
exports.donorServices = {
    getAllDonor,
    donationRequest,
    getMyDonationRequest,
    updateRequestStatus,
    getSingleDonor,
    getMyBloodRequest,
};
