"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const registerUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required.",
            invalid_type_error: "Name should string.",
        }),
        email: zod_1.z.string({
            required_error: "Email is required.",
            invalid_type_error: "Email should string.",
        }),
        password: zod_1.z.string({
            required_error: "Password is required.",
            invalid_type_error: "Password should string.",
        }),
        bloodType: zod_1.z.string({
            required_error: "Blood type is required.",
            invalid_type_error: "Blood type should string.",
        }),
        location: zod_1.z.string({
            required_error: "Location is required.",
            invalid_type_error: "Location should string.",
        }),
        bio: zod_1.z.string({
            required_error: "Bio is required.",
            invalid_type_error: "Bio should string.",
        }),
    }),
});
const loginUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Email should string.",
        }),
        password: zod_1.z.string({
            required_error: "Password is required.",
            invalid_type_error: "Password should string.",
        }),
    }),
});
const updateProfileValidation = zod_1.z.object({
    body: zod_1.z.object({
        availability: zod_1.z
            .boolean({
            invalid_type_error: "Availability must be a boolean",
        })
            .optional(),
        bloodType: zod_1.z
            .enum([
            "O_POSITIVE",
            "O_NEGATIVE",
            "A_POSITIVE",
            "A_NEGATIVE",
            "B_POSITIVE",
            "B_NEGATIVE",
            "AB_POSITIVE",
            "AB_NEGATIVE",
        ], {
            invalid_type_error: "Invalid blood type",
        })
            .optional(),
        location: zod_1.z.string().min(1, { message: "Location is required" }).optional(),
        name: zod_1.z.string().min(1, { message: "Name is required" }).optional(),
    }),
});
exports.userValidation = {
    registerUserValidation,
    loginUserValidation,
    updateProfileValidation,
};
