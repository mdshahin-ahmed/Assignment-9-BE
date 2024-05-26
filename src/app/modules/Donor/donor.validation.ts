import { Status } from "@prisma/client";
import { z } from "zod";

const requestDonorValidation = z.object({
  body: z.object({
    donorId: z.string({
      required_error: "donorId is required.",
      invalid_type_error: "donorId should string.",
    }),
    phoneNumber: z.string({
      required_error: "phoneNumber is required.",
      invalid_type_error: "phoneNumber should string.",
    }),
    dateOfDonation: z.string({
      required_error: "dateOfDonation is required.",
      invalid_type_error: "dateOfDonation should string.",
    }),
    hospitalName: z.string({
      required_error: "hospitalName is required.",
      invalid_type_error: "hospitalName should string.",
    }),
    hospitalAddress: z.string({
      required_error: "hospitalAddress is required.",
      invalid_type_error: "hospitalAddress should string.",
    }),
    reason: z.string({
      required_error: "reason is required.",
      invalid_type_error: "reason should string.",
    }),
  }),
});
const updateRequestStatusValidation = z.object({
  body: z.object({
    requestStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  }),
});

export const donorValidation = {
  requestDonorValidation,
  updateRequestStatusValidation,
};
