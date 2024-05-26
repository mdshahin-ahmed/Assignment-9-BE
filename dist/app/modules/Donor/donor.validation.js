"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorValidation = void 0;
const zod_1 = require("zod");
const requestDonorValidation = zod_1.z.object({
    body: zod_1.z.object({
        donorId: zod_1.z.string({
            required_error: "donorId is required.",
            invalid_type_error: "donorId should string.",
        }),
        phoneNumber: zod_1.z.string({
            required_error: "phoneNumber is required.",
            invalid_type_error: "phoneNumber should string.",
        }),
        dateOfDonation: zod_1.z.string({
            required_error: "dateOfDonation is required.",
            invalid_type_error: "dateOfDonation should string.",
        }),
        hospitalName: zod_1.z.string({
            required_error: "hospitalName is required.",
            invalid_type_error: "hospitalName should string.",
        }),
        hospitalAddress: zod_1.z.string({
            required_error: "hospitalAddress is required.",
            invalid_type_error: "hospitalAddress should string.",
        }),
        reason: zod_1.z.string({
            required_error: "reason is required.",
            invalid_type_error: "reason should string.",
        }),
    }),
});
const updateRequestStatusValidation = zod_1.z.object({
    body: zod_1.z.object({
        requestStatus: zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"]),
    }),
});
exports.donorValidation = {
    requestDonorValidation,
    updateRequestStatusValidation,
};
