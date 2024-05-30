import { z } from "zod";

const registerUserValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required.",
      invalid_type_error: "Name should string.",
    }),
    email: z.string({
      required_error: "Email is required.",
      invalid_type_error: "Email should string.",
    }),
    password: z.string({
      required_error: "Password is required.",
      invalid_type_error: "Password should string.",
    }),
    bloodType: z.string({
      required_error: "Blood type is required.",
      invalid_type_error: "Blood type should string.",
    }),
    location: z.string({
      required_error: "Location is required.",
      invalid_type_error: "Location should string.",
    }),
    bio: z.string({
      required_error: "Bio is required.",
      invalid_type_error: "Bio should string.",
    }),
  }),
});

const loginUserValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email should string.",
    }),
    password: z.string({
      required_error: "Password is required.",
      invalid_type_error: "Password should string.",
    }),
  }),
});

const updateProfileValidation = z.object({
  body: z.object({
    availability: z
      .boolean({
        invalid_type_error: "Availability must be a boolean",
      })
      .optional(),
    bloodType: z
      .enum(
        [
          "O_POSITIVE",
          "O_NEGATIVE",
          "A_POSITIVE",
          "A_NEGATIVE",
          "B_POSITIVE",
          "B_NEGATIVE",
          "AB_POSITIVE",
          "AB_NEGATIVE",
        ],
        {
          invalid_type_error: "Invalid blood type",
        }
      )
      .optional(),
    location: z.string().min(1, { message: "Location is required" }).optional(),
    name: z.string().min(1, { message: "Name is required" }).optional(),
  }),
});

export const userValidation = {
  registerUserValidation,
  loginUserValidation,
  updateProfileValidation,
};
