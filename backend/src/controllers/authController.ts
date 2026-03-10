import { Request, Response } from "express";
import { generateToken, verifyToken } from "../jwt";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const secret = process.env.SECRET!;

const login = (req: Request, res: Response) => {
  const name = req.body.name;
  const token = generateToken({ name: name }, secret, "10h");
  res.cookie("name", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 10 * 60 * 60 * 1000,
  });
  res.sendStatus(200);
};

const authMe = (req: Request, res: Response) => {
  const token = req.cookies.name;
  if (!token) {
    res.sendStatus(402);
    return;
  }
  try {
    const decoded = verifyToken(token, secret);
    res.json({ name: (decoded as any).name });
  } catch {
    res.sendStatus(401);
  }
};

export { authMe, login };
