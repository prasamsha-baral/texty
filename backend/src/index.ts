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
interface messages {
  texts: string;
  sender: string;
}

const message: messages[] = [];

io.on("connection", (socket) => {
  socket.on("texts", (texts: string, sender: string): void => {
    if (typeof texts !== "string" && typeof sender !== "string") return;
    console.log(texts + " " + sender);
    message.push({ texts, sender });
    io.emit("messages", message);
  });
  // on First connection
  socket.emit("messages", message);
});

httpServer.listen(port, "0.0.0.0", (): void => {
  console.log("Server started at port ", port);
});
