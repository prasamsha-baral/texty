import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import router from "./routes";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

const port = 8080;
const app = express();
const httpServer = createServer(app);
const messages: messages[] = [];

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const io = new Server(httpServer, {
  cookie: true,
  cors: corsOptions,
});

interface messages {
  message: string;
  user: string;
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/", router);

io.on("connection", (socket): void => {
  socket.on("texts", (message: string, user: string): void => {
    if (typeof message !== "string" || typeof user !== "string") return;
    messages.push({ message, user });
    io.emit("messages", messages.slice(-10));
  });

  socket.emit("messages", messages);
});

httpServer.listen(port, "0.0.0.0", (): void => {
  console.log("Server started at port ", port);
});
