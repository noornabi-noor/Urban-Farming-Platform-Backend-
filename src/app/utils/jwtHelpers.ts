import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { envVars } from "../config/env";

export type TJwtPayload = JWTPayload & {
  id: string;
  email: string;
  role: string;
};

const getAccessSecret = () =>
  new TextEncoder().encode(
    envVars.ACCESS_TOKEN_SECRET || envVars.BETTER_AUTH_SECRET
  );

const getRefreshSecret = () =>
  new TextEncoder().encode(
    envVars.REFRESH_TOKEN_SECRET || envVars.BETTER_AUTH_SECRET
  );

export const signAccessToken = async (payload: {
  id: string;
  email: string;
  role: string;
}): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(envVars.ACCESS_TOKEN_EXPIRES ?? "15m")
    .sign(getAccessSecret());
};

export const signRefreshToken = async (payload: {
  id: string;
  email: string;
  role: string;
}): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(envVars.REFRESH_TOKEN_EXPIRES ?? "7d")
    .sign(getRefreshSecret());
};

export const verifyAccessToken = async (token: string): Promise<TJwtPayload> => {
  const { payload } = await jwtVerify(token, getAccessSecret());
  return payload as TJwtPayload;
};

export const verifyRefreshToken = async (
  token: string
): Promise<TJwtPayload> => {
  const { payload } = await jwtVerify(token, getRefreshSecret());
  return payload as TJwtPayload;
};
