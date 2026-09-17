import express from "express";
import payload from "payload";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGINS || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Traveler connected via WebSocket:", socket.id);

  socket.on("unlock_province", (data) => {
    // Broadcast live unlock event across community feed
    io.emit("community_unlock_event", {
      ...data,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Traveler disconnected:", socket.id);
  });
});

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || "travel_box_vietnam_super_secret_key_genz_2026",
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload CMS Admin URL: ${payload.getAdminURL()}`);
      payload.logger.info(`Travel Box Vietnam API: http://localhost:${PORT}/api`);
    },
  });

  server.listen(PORT, () => {
    console.log(`Travel Box Vietnam Backend Server running on http://localhost:${PORT}`);
  });
};

start();
