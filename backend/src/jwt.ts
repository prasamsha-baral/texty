import jwt from "jsonwebtoken";

interface user {
  name: string;
}
interface UserPayload {
  name: string;
  iat?: number;
  exp?: number;
}

export const generateToken = (
  payload: user,
  secret: string,
  time: jwt.SignOptions["expiresIn"],
): string => {
  return jwt.sign(payload, secret, { expiresIn: time });
};

export const verifyToken = (token: string, secret: string): UserPayload => {
  return jwt.verify(token, secret) as UserPayload;
};
