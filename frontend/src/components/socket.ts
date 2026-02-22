import { io } from "socket.io-client";

const URL = import.meta.env.VITE_IP || "http://localhost:8080";

export const socket = io(URL);
