import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { AuthService } from "./auth.service";
import { envVars } from "../../config/env";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "User registered successfully!",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  // Set refresh token in httpOnly cookie
  res.cookie("refreshToken", result.refreshToken, {
    secure: envVars.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully!",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

export const AuthController = {
  registerUser,
  loginUser,
};
