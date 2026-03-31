
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import { connectDb } from "./lib/db.js";
import { app, server } from "./lib/socket.js";  

dotenv.config();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chatconnect-theta.vercel.app"
  ],
  credentials: true
}));


app.options("*", cors());


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


app.get("/", (req, res) => {
  res.send("ChatConnect backend is live 🚀");
});

app.get("/ping", (req, res) => {
  res.sendStatus(200);   
});


const port = process.env.PORT || 4000;

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port: ${port}`);
  connectDb();
});