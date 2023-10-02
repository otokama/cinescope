import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

function jwtClient(publicPath: (string | RegExp)[]) {
  if (!process.env.SESSION_TOKEN_SECRET) {
    throw new Error("session token secret not set");
  }
  return expressjwt({
    secret: process.env.SESSION_TOKEN_SECRET,
    algorithms: ["HS256"],
  }).unless({ path: publicPath });
}

function getNewSessionToken(sessionId: string, accountId: number) {
  if (!sessionId) {
    throw new Error("invalid sessionId");
  }
  if (!process.env.SESSION_TOKEN_SECRET) {
    throw new Error("session token secret not set");
  }
  return jwt.sign({ sessionId, accountId }, process.env.SESSION_TOKEN_SECRET, {
    expiresIn: "2d",
  });
}

export { getNewSessionToken, jwtClient };
