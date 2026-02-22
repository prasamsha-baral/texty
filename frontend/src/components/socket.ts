import { io } from "socket.io-client";

const URL = import.meta.env.VITE_IP || "http://localhost:8080";

const socket = io(URL);
export { socket, URL };
