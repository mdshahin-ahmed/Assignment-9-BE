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
    bio: z
      .string({
        invalid_type_error: "Bio should string.",
      })
      .optional(),
    lastDonationDate: z
      .string({
        invalid_type_error: "Last Donation Date should string.",
      })
      .optional(),
  }),
});

export const userValidation = {
  registerUserValidation,
  loginUserValidation,
  updateProfileValidation,
};
