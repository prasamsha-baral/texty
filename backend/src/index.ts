import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import { generateToken, verifyToken } from "./jwt.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __frontend = path.join(__dirname, "../../frontend/dist");

dotenv.config({ path: "./.env" });

const port = 8080;
const app = express();
const httpServer = createServer(app);
const secret = process.env.SECRET || "sumitpdl";
const message: messages[] = [];

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const io = new Server(httpServer, {
  cookie: true,
  cors: corsOptions,
});

interface messages {
  texts: string;
  sender: string;
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(__frontend));

app.get("/", (req, res) => {
  res.sendFile(path.join(__frontend, "index.html"));
});
app.post("/login", (req, res) => {
  const name = req.body.name;
  const token = generateToken({ name: name }, secret, "10h");
  res.cookie("name", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 10 * 60 * 60 * 1000,
  });
  res.sendStatus(200);
});
app.get("/auth/me", (req, res) => {
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
});

io.on("connection", (socket): void => {
  socket.on("texts", (texts: string, sender: string): void => {
    if (typeof texts !== "string" || typeof sender !== "string") return;
    message.push({ texts, sender });
    io.emit("messages", message);
  });

  socket.emit("messages", message);
});

httpServer.listen(port, "0.0.0.0", (): void => {
  console.log("Server started at port ", port);
});
