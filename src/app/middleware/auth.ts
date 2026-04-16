import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwtHelpers";
import AppError from "../errorHelpers/AppError";
import status from "http-status";
import catchAsync from "../utils/catchAsync";

// Extend Express Request globally so req.user is available everywhere
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Verifies Bearer token and attaches decoded user to req.user
 */
export const authenticate = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        status.UNAUTHORIZED,
        "Access token is required! Please login first."
      );
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyAccessToken(token);

    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    next();
  }
);

/**
 * Role-based access control guard.
 * Usage: authorize("ADMIN", "VENDOR")
 */
export const authorize = (...roles: string[]) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      if (!req.user) {
        throw new AppError(status.UNAUTHORIZED, "You are not authenticated!");
      }

      if (!roles.includes(req.user.role)) {
        throw new AppError(
          status.FORBIDDEN,
          "You do not have permission to access this resource!"
        );
      }

      next();
    }
  );
};
