import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError) => {
  const errorMessages = err.issues.map((issue: ZodIssue) => issue.message);
  const concatMessages = errorMessages.join(" ");
  const issues = err.errors.map((e) => ({
    field: e.path[1],
    message: e.message,
  }));

  return {
    statusCode: 400,
    message: concatMessages,
    errorDetails: issues,
  };
};

export default handleZodError;
