import { io } from "socket.io-client";

const SOCKET_ROUTE =process.env.SOCKET_ROUTE || "http://localhost:3002";

export const socketClient = io(SOCKET_ROUTE, {
  autoConnect: false
});