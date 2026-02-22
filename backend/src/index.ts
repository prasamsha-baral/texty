import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import { generateToken, verifyToken } from "./jwt";
import cookieParser from "cookie-parser";

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

app.post("/user", (req, res) => {
  const name = req.body.name;
  const token = generateToken({ name: name }, secret, "10m");
  console.log(token);
  res.cookie("name", token);
  res.sendStatus(200);
});
app.get("/login", (req, res) => {
  console.log(req.cookies);
  const token = req.cookies.name;
  if (!token) {
    res.sendStatus(402);
    return;
  }
  try {
    const decoded = verifyToken(token, secret);
    res.json({ name: (decoded as any).name }); // ✅ send response
  } catch {
    res.sendStatus(401); // ✅ handle invalid/expired token
  }
});

io.on("connection", (socket): void => {
  socket.on("texts", (texts: string, sender: string): void => {
    if (typeof texts !== "string" || typeof sender !== "string") return;
    console.log(texts + " " + sender);
    message.push({ texts, sender });
    io.emit("messages", message);
  });

  socket.emit("messages", message);
});

httpServer.listen(port, "0.0.0.0", (): void => {
  console.log("Server started at port ", port);
});
