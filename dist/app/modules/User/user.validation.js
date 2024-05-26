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
        age: zod_1.z.number({
            required_error: "Age is required.",
            invalid_type_error: "Age should number.",
        }),
        bio: zod_1.z.string({
            required_error: "Bio is required.",
            invalid_type_error: "Bio should string.",
        }),
        lastDonationDate: zod_1.z.string({
            required_error: "Last Donation Date is required.",
            invalid_type_error: "Last Donation Date should string.",
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
        age: zod_1.z
            .number({
            invalid_type_error: "Age should number.",
        })
            .optional(),
        bio: zod_1.z
            .string({
            invalid_type_error: "Bio should string.",
        })
            .optional(),
        lastDonationDate: zod_1.z
            .string({
            invalid_type_error: "Last Donation Date should string.",
        })
            .optional(),
    }),
});
exports.userValidation = {
    registerUserValidation,
    loginUserValidation,
    updateProfileValidation,
};
