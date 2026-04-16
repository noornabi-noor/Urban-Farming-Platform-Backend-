import { ErrorRequestHandler } from "express";
import status from "http-status";
import { envVars } from "../config/env";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong!";
  let errorDetails = err;

  // Handle specific errors (Prisma, Zod, etc.) here in the future

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: envVars.NODE_ENV === "development" ? errorDetails : undefined,
    stack: envVars.NODE_ENV === "development" ? err.stack : undefined,
  });
};
