import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const port = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const message: string[] = [];

io.on("connection", (socket) => {
  socket.on("texts", (data: string): void => {
    if (typeof data !== "string") return;
    message.push(data);
    io.emit("messages", message);
  });
  // on First connection
  socket.emit("messages", message);
});

httpServer.listen(port, "0.0.0.0", (): void => {
  console.log("Server started at port ", port);
});
