import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import msgRoutes from "./routes/msg.route.js";

import cookieParser from "cookie-parser";
import { connectDb } from "./lib/db.js";


dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chatconnect-theta.vercel.app"
  ],
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/msg", msgRoutes);

app.get("/", (req, res) => {
  res.send("ChatConnect backend is live 🚀");
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`server is running at port: ${port}`);
  connectDb()
});
