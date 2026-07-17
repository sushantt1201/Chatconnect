import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "https://chatconnect-theta.vercel.app",
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

io.use(socketAuthMiddleware);

// A user can have multiple tabs/devices connected.
const userSocketMap = new Map(); // userId -> Set(socketId)

const getOnlineUserIds = () => [...userSocketMap.keys()];

export function getReceiverSocketIds(userId) {
  return [...(userSocketMap.get(String(userId)) || [])];
}

// Kept for compatibility with any older code.
export function getReceiverSocketId(userId) {
  return getReceiverSocketIds(userId)[0];
}

export function emitToUser(userId, eventName, payload) {
  const socketIds = getReceiverSocketIds(userId);

  for (const socketId of socketIds) {
    io.to(socketId).emit(eventName, payload);
  }
}

io.on("connection", (socket) => {
  const userId = String(socket.userId);

  const sockets = userSocketMap.get(userId) || new Set();
  sockets.add(socket.id);
  userSocketMap.set(userId, sockets);

  io.emit("getOnlineUsers", getOnlineUserIds());

  socket.on("disconnect", () => {
    const currentSockets = userSocketMap.get(userId);

    if (currentSockets) {
      currentSockets.delete(socket.id);

      if (currentSockets.size === 0) {
        userSocketMap.delete(userId);
      } else {
        userSocketMap.set(userId, currentSockets);
      }
    }

    io.emit("getOnlineUsers", getOnlineUserIds());
  });
});

export { io, app, server };
