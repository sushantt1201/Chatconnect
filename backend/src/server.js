import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import msgRoutes from "./routes/msg.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 10000;

app.use("/api/auth", authRoutes);
app.use("/api/msg", msgRoutes);

app.get("/", (req, res) => {
  res.send("ChatConnect backend is live 🚀");
});


// if (process.env.NODE_ENV === "production") {
//   const frontendPath = path.join(__dirname, "../../frontend/dist");
//   app.use(express.static(frontendPath));

//   app.get("*", (_, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// }

app.listen(port, () => {
  console.log(`server is running at port: ${port}`);
});
