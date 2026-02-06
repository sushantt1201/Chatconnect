import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import msgRoutes from "./routes/msg.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",                 // local frontend
    "https://chatconnect-theta.vercel.app",  // production frontend
  ],
  credentials: true,
}));

const port = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("ChatConnect backend is live 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/msg", msgRoutes);

app.listen(port, () => {
  console.log(`server is running at port: ${port}`);
});
