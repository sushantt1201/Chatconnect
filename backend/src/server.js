// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import cookieParser from "cookie-parser";
// import { connectDb } from "./lib/db.js";

// dotenv.config();
// const app = express();

// /* ✅ Your existing CORS (unchanged) */
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://chatconnect-theta.vercel.app"
//   ],
//   credentials: true
// }));

// /* ✅ Preflight handler (kept) */
// app.options("*", cors());

// /* ✅ FIX: Increase body size limit to allow base64 image */
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// app.get("/", (req, res) => {
//   res.send("ChatConnect backend is live 🚀");
// });

// const port = process.env.PORT || 10000;
// app.listen(port, () => {
//   console.log(`server is running at port: ${port}`);
//   connectDb();
// });



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import { connectDb } from "./lib/db.js";
import { app, server } from "./lib/socket.js";  // 🔥 import from socket.js

dotenv.config();

/* ✅ Your existing CORS (unchanged) */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chatconnect-theta.vercel.app"
  ],
  credentials: true
}));

/* ✅ Preflight handler */
app.options("*", cors());

/* ✅ Body size limit */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("ChatConnect backend is live 🚀");
});

const port = process.env.PORT || 10000;

/* 🔥 IMPORTANT: use server.listen instead of app.listen */
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
  connectDb();
});