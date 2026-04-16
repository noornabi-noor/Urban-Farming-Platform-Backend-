import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import AppError from "../../errorHelpers/AppError";
import status from "http-status";
import { signAccessToken, signRefreshToken } from "../../utils/jwtHelpers";

const registerUserIntoDB = async (payload: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new AppError(status.BAD_REQUEST, "User with this email already exists!");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return result;
};

const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user || !user.password) {
    throw new AppError(status.UNAUTHORIZED, "Invalid email or password!");
  }

  if (user.status === "BLOCKED" || user.status === "INACTIVE") {
    throw new AppError(status.FORBIDDEN, "Your account is not active!");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new AppError(status.UNAUTHORIZED, "Invalid email or password!");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = await signAccessToken(jwtPayload);
  const refreshToken = await signRefreshToken(jwtPayload);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
};
