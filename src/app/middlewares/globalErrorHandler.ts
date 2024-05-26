import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ApiError from "../errors/ApiError";
import handleZodError from "../errors/handleZodError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultValues = {
    statusCode: 500,
    message: "Something went wrong!",
    errorDetails: {} || null,
  };

  if (err instanceof ZodError) {
    const error = handleZodError(err);
    defaultValues.statusCode = error.statusCode;
    defaultValues.message = error.message;
    defaultValues.errorDetails = error.errorDetails;
  } else if (err instanceof ApiError) {
    defaultValues.message = err.message;
    defaultValues.statusCode = err.statusCode;
    defaultValues.errorDetails = null;
  }

  return res.status(defaultValues.statusCode).json({
    success: false,
    message: defaultValues.message,
    errorDetails: defaultValues.errorDetails,
  });
};
